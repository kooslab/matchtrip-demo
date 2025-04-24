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
	// Import marked
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	// --- State ---
	let city = '베를린';
	let days = 3;
	let keywords = '';
	let journeyOptions: { [key: string]: string } | null = $state(null);
	let selectedJourneyValue: string | null = $state(null);
	let isLoading = $state(false);
	let isSubmitting = $state(false);
	// --- End State ---

	// --- Remove Static Markdown Test Data ---
	// const testMarkdownOption1 = ...;
	// let testParsedHtml: string;
	// try { ... } catch { ... }
	// --- End Remove Static Test Data ---

	// Initialize Supabase client using public env vars (safe for client-side)

	// --- Functions ---
	async function generateJourney() {
		console.log('Generating journey...');
		isLoading = true;
		journeyOptions = null;
		selectedJourneyValue = null;
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
			console.log('Full data received:', data);
			console.log(
				'Keys of data.options:',
				data.options ? Object.keys(data.options) : 'null or undefined'
			);
			journeyOptions = data.options || null;
		} catch (error) {
			console.error('Error generating journey:', error);
			alert('Error generating journey options. Please try again.');
			journeyOptions = null;
		} finally {
			isLoading = false;
		}
	}

	async function submitJourney() {
		if (!selectedJourneyValue) return;
		isSubmitting = true;

		try {
			const journeyData = {
				city,
				days,
				keywords,
				journey_details: selectedJourneyValue,
				status: 'pending'
			};

			const response = await fetch('/api/submit-journey', {
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
			journeyOptions = null;
			selectedJourneyValue = null;
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

	let optionsArray = $derived(journeyOptions ? Object.entries(journeyOptions) : []);

	// No dynamic parsing needed for API results for now
</script>

<div class="container mx-auto px-4 py-24">
	<Card class="mx-auto max-w-2xl">
		<CardHeader>
			<CardTitle class="text-2xl">다음 여행 계획하기</CardTitle>
		</CardHeader>
		<CardContent class="space-y-4">
			<div>
				<Label for="city">도시</Label>
				<Input id="city" type="text" bind:value={city} required />
			</div>

			<div>
				<Label for="days">여행 기간 (일)</Label>
				<Input id="days" type="number" bind:value={days} min="1" required />
			</div>

			<div>
				<Label for="keywords">관심 키워드 (쉼표로 구분)</Label>
				<Input
					id="keywords"
					type="text"
					bind:value={keywords}
					placeholder="예: 음식, 역사, 미술관"
				/>
			</div>

			<Button class="w-full" onclick={generateJourney} disabled={isLoading}>
				{isLoading ? '여행 옵션 생성 중...' : '여행 옵션 생성하기'}
			</Button>
		</CardContent>
	</Card>

	<!-- Loading Indicator -->
	{#if isLoading}
		<div
			class="mx-auto mt-8 flex max-w-2xl flex-col items-center justify-center space-y-4 text-center text-muted-foreground"
		>
			<!-- Simple SVG Spinner -->
			<svg
				class="h-8 w-8 animate-spin text-primary"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
			>
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
				></circle>
				<path
					class="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				></path>
			</svg>
			<p>여행 옵션을 생성하는 중입니다. 잠시만 기다려 주세요...</p>
		</div>
	{/if}

	<!-- Dynamic Display options from API -->
	{#if !isLoading && optionsArray.length > 0}
		<div class="mx-auto mt-8 max-w-2xl">
			<h2 class="mb-4 text-xl font-semibold">선호하는 일정 선택</h2>
			<div class="space-y-4">
				{#each optionsArray as [key, value], i}
					{@const parsedHtml = marked.parse(value)}
					<Card
						class="cursor-pointer {selectedJourneyValue === value ? 'border-primary' : ''}"
						onclick={() => {
							selectedJourneyValue = value;
							console.log('Selected journey value:', selectedJourneyValue);
						}}
					>
						<CardContent class="pt-6">
							<h3 class="font-medium">옵션 {i + 1}</h3>
							<div class="prose prose-sm max-w-none">
								{@html parsedHtml}
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>

			<Button
				class="mt-6 w-full"
				onclick={submitJourney}
				disabled={!selectedJourneyValue || isSubmitting}
			>
				{isSubmitting ? '제출 중...' : '선택한 여행 제출하기'}
			</Button>
		</div>
	{/if}
</div>
