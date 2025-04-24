<script lang="ts">
	// No need for createClient here anymore
	// import { createClient } from '@supabase/supabase-js';
	import type { Journey } from '$lib/types';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	// No need for direct env var imports here
	// import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

	// --- State ---
	let city = 'Berlin';
	let days = 3;
	let keywords = '';
	let journeyOptions: string[] = [];
	let selectedJourney: string | null = null;
	let isLoading = false;
	let isSubmitting = false;
	// --- End State ---

	// Initialize Supabase client using public env vars (safe for client-side)

	// --- Functions ---
	async function generateJourney() {
		console.log('Generating journey...');
		isLoading = true;
		try {
			const response = await fetch('/api/generate-journey', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ city, days, keywords })
			});

			if (!response.ok) {
				throw new Error('Failed to generate journey options');
			}

			const data = await response.json();
			journeyOptions = data.options || [];
			selectedJourney = null;
		} catch (error) {
			console.error('Error generating journey:', error);
			alert('Error generating journey options. Please try again.');
			journeyOptions = [];
		} finally {
			isLoading = false;
		}
	}

	async function submitJourney() {
		if (!selectedJourney) return;
		isSubmitting = true;

		try {
			// Prepare data for the API
			const journeyData = {
				city,
				days,
				keywords,
				journey_details: selectedJourney,
				status: 'pending'
				// user_id will not be sent as we removed session logic
			};

			const response = await fetch('/api/submit-journey', {
				// Call the new API route
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(journeyData)
			});

			if (!response.ok) {
				const errorData = await response
					.json()
					.catch(() => ({ message: 'Failed to submit journey. API error.' }));
				throw new Error(errorData.message || 'Failed to submit journey');
			}

			alert('Journey submitted successfully! You can view it under My Journeys.');
			// Reset form
			journeyOptions = [];
			selectedJourney = null;
			city = 'Berlin';
			days = 3;
			keywords = '';
		} catch (error: any) {
			console.error('Error submitting journey:', error);
			alert(`Failed to submit journey: ${error.message}`);
		} finally {
			isSubmitting = false;
		}
	}
	// --- End Functions ---
</script>

<div class="container mx-auto px-4 py-24">
	<Card class="mx-auto max-w-2xl">
		<CardHeader>
			<CardTitle class="text-2xl">Plan Your Next Journey</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			<div>
				<Label for="city">City</Label>
				<Input id="city" type="text" bind:value={city} required />
			</div>

			<div>
				<Label for="days">Number of Days</Label>
				<Input id="days" type="number" bind:value={days} min="1" required />
			</div>

			<div>
				<Label for="keywords">Keywords (comma separated)</Label>
				<Input
					id="keywords"
					type="text"
					bind:value={keywords}
					placeholder="e.g., food, history, art"
				/>
			</div>

			<Button class="w-full" onclick={generateJourney} disabled={isLoading}>
				{isLoading ? 'Generating Options...' : 'Generate a new Journey'}
			</Button>
		</CardContent>
	</Card>

	{#if journeyOptions.length > 0}
		<div class="mx-auto mt-8 max-w-2xl">
			<h2 class="mb-4 text-xl font-semibold">Select Your Preferred Itinerary</h2>
			<div class="space-y-4">
				{#each journeyOptions as option, i}
					<Card
						class="cursor-pointer {selectedJourney === option ? 'border-primary' : ''}"
						onclick={() => (selectedJourney = option)}
					>
						<CardContent class="pt-6">
							<h3 class="font-medium">Option {i + 1}</h3>
							<p class="whitespace-pre-wrap text-sm text-muted-foreground">{option}</p>
						</CardContent>
					</Card>
				{/each}
			</div>

			<Button
				class="mt-6 w-full"
				onclick={submitJourney}
				disabled={!selectedJourney || isSubmitting}
			>
				{isSubmitting ? 'Submitting...' : 'Submit Selected Journey'}
			</Button>
		</div>
	{/if}
</div>
