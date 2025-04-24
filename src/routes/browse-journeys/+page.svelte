<script lang="ts">
	import type { PageData } from './$types';
	import type { Journey } from '$lib/types';
	// import { getContext } from 'svelte'; // Context not needed if supabase isn't passed
	// import type { SupabaseClient } from '@supabase/supabase-js'; // Not needed directly
	import Button from '$lib/components/ui/button/button.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '$lib/components/ui/card';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();
	// Assuming pendingJourneys is loaded via +page.server.ts
	let pendingJourneys = $derived(data.pendingJourneys ?? []);

	// Removed direct Supabase client access
	// const supabase: SupabaseClient = data.;

	let selectedJourneyForProposal: Journey | null = null;
	let proposalMessage = '';
	let proposalCost = '';
	let isSubmitting = false;

	// Reactive variable for parsed journey details
	let parsedPendingJourneyDetails = $derived(
		pendingJourneys.map((j) => (j.journey_details ? marked.parse(j.journey_details) : ''))
	);

	async function submitProposal() {
		if (!selectedJourneyForProposal || !proposalMessage || !proposalCost) return;

		isSubmitting = true;
		try {
			const proposalData = {
				journey_id: selectedJourneyForProposal.id,
				message: proposalMessage,
				cost: parseFloat(proposalCost),
				status: 'pending'
				// guide_id should ideally be handled server-side if needed later
			};

			const response = await fetch('/api/submit-proposal', {
				// Call new API endpoint
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

			alert('Proposal submitted successfully!');

			// Refresh data or remove the journey from the list locally
			pendingJourneys = pendingJourneys.filter((j) => j.id !== selectedJourneyForProposal!.id);

			// Reset form
			selectedJourneyForProposal = null;
			proposalMessage = '';
			proposalCost = '';
		} catch (error: any) {
			console.error('Error submitting proposal:', error);
			alert(`Failed to submit proposal: ${error.message}`);
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
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each pendingJourneys as journey, i (journey.id)}
				<Card class={selectedJourneyForProposal?.id === journey.id ? 'border-primary' : ''}>
					<CardHeader>
						<CardTitle>{journey.city} - {journey.days}일</CardTitle>
						<p class="text-sm text-muted-foreground">요청일: {formatDate(journey.created_at)}</p>
					</CardHeader>
					<CardContent class="prose prose-sm max-w-none">
						<p class="mb-2 text-sm font-medium">키워드: {journey.keywords || '없음'}</p>
						{@html parsedPendingJourneyDetails[i]}
					</CardContent>
					<CardFooter>
						{#if selectedJourneyForProposal?.id !== journey.id}
							<Button class="w-full" onclick={() => (selectedJourneyForProposal = journey)}>
								제안하기 선택
							</Button>
						{:else}
							<Button
								variant="secondary"
								class="w-full"
								onclick={() => (selectedJourneyForProposal = null)}
							>
								취소
							</Button>
						{/if}
					</CardFooter>
				</Card>
			{/each}
		</div>
	{/if}

	{#if selectedJourneyForProposal}
		<div class="mt-12 border-t pt-8">
			<h2 class="mb-6 text-2xl font-semibold">
				{selectedJourneyForProposal.city} 여행 제안서 제출
			</h2>
			<Card class="mx-auto max-w-lg">
				<CardContent class="space-y-4 pt-6">
					<div>
						<Label for="proposalMessage">제안 메시지</Label>
						<Textarea
							id="proposalMessage"
							bind:value={proposalMessage}
							rows={5}
							placeholder="자신을 소개하고 이 여행에 적합한 가이드인 이유를 설명해주세요..."
							required
						/>
					</div>
					<div>
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
				</CardContent>
				<CardFooter>
					<Button class="w-full" onclick={submitProposal} disabled={isSubmitting}>
						{isSubmitting ? '제출 중...' : '제안서 제출하기'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	{/if}
</div>
