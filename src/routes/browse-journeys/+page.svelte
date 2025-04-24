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

	let { data }: { data: PageData } = $props();
	// Assuming pendingJourneys is loaded via +page.server.ts
	let pendingJourneys = $derived(data.pendingJourneys ?? []);

	// Removed direct Supabase client access
	// const supabase: SupabaseClient = data.supabase;

	let selectedJourneyForProposal: Journey | null = null;
	let proposalMessage = '';
	let proposalCost = '';
	let isSubmitting = false;

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
	<h1 class="mb-6 text-3xl font-bold">Browse Pending Journeys</h1>

	{#if pendingJourneys.length === 0}
		<p class="text-center text-muted-foreground">No pending journeys available right now.</p>
	{:else}
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each pendingJourneys as journey (journey.id)}
				<Card class={selectedJourneyForProposal?.id === journey.id ? 'border-primary' : ''}>
					<CardHeader>
						<CardTitle>{journey.city} - {journey.days} days</CardTitle>
						<p class="text-sm text-muted-foreground">Submitted: {formatDate(journey.created_at)}</p>
					</CardHeader>
					<CardContent>
						<p class="mb-2 text-sm font-medium">Keywords: {journey.keywords || 'N/A'}</p>
						<p class="mb-4 whitespace-pre-wrap text-sm">{journey.journey_details}</p>
					</CardContent>
					<CardFooter>
						{#if selectedJourneyForProposal?.id !== journey.id}
							<Button class="w-full" onclick={() => (selectedJourneyForProposal = journey)}>
								Select to Propose
							</Button>
						{:else}
							<Button
								variant="secondary"
								class="w-full"
								onclick={() => (selectedJourneyForProposal = null)}
							>
								Cancel
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
				Submit Proposal for {selectedJourneyForProposal.city} Journey
			</h2>
			<Card class="mx-auto max-w-lg">
				<CardContent class="space-y-4 pt-6">
					<div>
						<Label for="proposalMessage">Your Message</Label>
						<Textarea
							id="proposalMessage"
							bind:value={proposalMessage}
							rows={5}
							placeholder="Describe your proposal and why you're the best guide..."
							required
						/>
					</div>
					<div>
						<Label for="proposalCost">Proposed Cost (EUR)</Label>
						<Input
							id="proposalCost"
							type="number"
							bind:value={proposalCost}
							min="0"
							step="any"
							placeholder="e.g., 150.50"
							required
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button class="w-full" onclick={submitProposal} disabled={isSubmitting}>
						{isSubmitting ? 'Submitting...' : 'Submit Proposal'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	{/if}
</div>
