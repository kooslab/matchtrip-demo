<script lang="ts">
	import type { PageData } from './$types';
	import type { Journey } from '$lib/types';
	// import { getContext } from 'svelte'; // Context not needed if supabase isn't passed
	// import type { SupabaseClient } from '@supabase/supabase-js'; // Not needed directly
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
		CardFooter
	} from '$lib/components/ui/card/index.js';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	let { data }: { data: PageData } = $props();
	// Assuming pendingJourneys is loaded via +page.server.ts
	let pendingJourneys = $derived(data.pendingJourneys ?? []);

	// Removed direct Supabase client access
	// const supabase: SupabaseClient = data.;

	let selectedJourneyForProposal: Journey | null = null;
	let proposalMessage = '';
	let proposalCost = '';
	let isSubmitting = false;
	let showProposalModal = false;

	// Reactive variable for parsed journey details
	let parsedPendingJourneyDetails = $derived(
		pendingJourneys.map((j) => (j.journey_details ? marked.parse(j.journey_details) : ''))
	);

	async function submitProposal() {
		if (!selectedJourneyForProposal || !proposalMessage || !proposalCost) return;

		isSubmitting = true;
		const journeyId = selectedJourneyForProposal.id; // Store the ID before resetting
		try {
			const proposalData = {
				journey_id: journeyId,
				message: proposalMessage,
				cost: parseFloat(proposalCost),
				status: 'pending'
			};

			const response = await fetch('/api/submit-proposal', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(proposalData)
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to submit proposal. API error.' }));
				throw new Error(errorData.message || 'Failed to submit proposal');
			}

			// Remove the journey from the list before resetting the form
			pendingJourneys = pendingJourneys.filter((j) => j.id !== journeyId);

			// Reset form
			selectedJourneyForProposal = null;
			proposalMessage = '';
			proposalCost = '';

			alert('제안이 성공적으로 제출되었습니다!');
		} catch (error: any) {
			console.error('Error submitting proposal:', error);
			alert(`제안 제출 실패: ${error.message}`);
		} finally {
			isSubmitting = false;
		}
	}

	// Helper function to format date
	function formatDate(dateString: string) {
		return new Date(dateString).toLocaleDateString();
	}
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold">제안 대기 중인 여행</h1>

	{#if pendingJourneys.length === 0}
		<p class="text-center text-muted-foreground">현재 제안 가능한 여행이 없습니다.</p>
	{:else}
		<div class="flex flex-col gap-6">
			{#each pendingJourneys as journey, i (journey.id)}
				<Card class={selectedJourneyForProposal?.id === journey.id ? 'border-primary' : ''}>
					<CardHeader>
						<CardTitle>{journey.city} - {journey.days}일</CardTitle>
						<p class="text-sm text-muted-foreground">요청일: {formatDate(journey.created_at)}</p>
					</CardHeader>
					<CardContent
						class="prose prose-sm max-w-none dark:text-slate-50 dark:prose-headings:text-slate-50 dark:prose-strong:text-slate-50"
					>
						<p class="mb-2 text-sm font-medium">키워드: {journey.keywords || '없음'}</p>
						{@html parsedPendingJourneyDetails[i]}
					</CardContent>
					<CardFooter>
						<Dialog.Root>
							<Dialog.Trigger
								class={buttonVariants({ variant: 'outline' })}
								onclick={() => (selectedJourneyForProposal = journey)}
							>
								제안하기 선택
							</Dialog.Trigger>
							<Dialog.Content class="sm:max-w-[425px]">
								<Dialog.Header>
									<Dialog.Title>{journey.city} 여행 제안서 제출</Dialog.Title>
								</Dialog.Header>
								<div class="grid gap-4 py-4">
									<div class="grid gap-2">
										<Label for="proposalCost">제안 비용 (EUR)</Label>
										<Input
											id="proposalCost"
											type="number"
											bind:value={proposalCost}
											min="0"
											step="any"
											placeholder="예: 150.50"
											required
										/>
									</div>
									<div class="grid gap-2">
										<Label for="proposalMessage">제안 메시지</Label>
										<Textarea
											id="proposalMessage"
											bind:value={proposalMessage}
											rows={5}
											placeholder="자신을 소개하고 이 여행에 적합한 가이드인 이유를 설명해주세요..."
											required
										/>
									</div>
								</div>
								<Dialog.Footer>
									<Button variant="outline" onclick={() => Dialog.close()}>취소</Button>
									<Button onclick={submitProposal} disabled={isSubmitting}>
										{isSubmitting ? '제출 중...' : '제안서 제출하기'}
									</Button>
								</Dialog.Footer>
							</Dialog.Content>
						</Dialog.Root>
					</CardFooter>
				</Card>
			{/each}
		</div>
	{/if}
</div>
