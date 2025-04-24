<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	let journeys = $derived(data.journeys ?? []);

	// Status display mapping
	const statusDisplayNames = {
		pending: '대기중',
		proposed: '제안됨',
		accepted: '수락됨'
		// Add other statuses if needed
	};

	function getStatusDisplayName(status: string): string {
		return statusDisplayNames[status] || status; // Fallback to original status if not found
	}

	// Reactive variable for parsed journey details
	let parsedJourneyDetails = $derived(
		journeys.map((j) => (j.journey_details ? marked.parse(j.journey_details) : ''))
	);
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold">나의 여행 계획</h1>

	{#if journeys.length === 0}
		<p class="text-gray-500">아직 제출한 여행 계획이 없습니다.</p>
	{:else}
		<div class="space-y-6">
			{#each journeys as journey, i (journey.id)}
				<div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<h2 class="text-xl font-semibold">
							{journey.city} - {journey.days}일
						</h2>
						<span
							class="rounded-full px-3 py-1 text-sm font-medium capitalize"
							class:bg-yellow-100={journey.status === 'pending'}
							class:text-yellow-800={journey.status === 'pending'}
							class:bg-blue-100={journey.status === 'proposed'}
							class:text-blue-800={journey.status === 'proposed'}
							class:bg-green-100={journey.status === 'accepted'}
							class:text-green-800={journey.status === 'accepted'}
						>
							{getStatusDisplayName(journey.status)}
						</span>
					</div>
					<p class="mb-2 text-muted-foreground">키워드: {journey.keywords || '없음'}</p>
					<div class="prose prose-sm mb-4 max-w-none">
						{@html parsedJourneyDetails[i]}
					</div>
					<p class="text-sm text-muted-foreground">
						제출일: {new Date(journey.created_at).toLocaleString()}
					</p>
					<!-- TODO: Add proposal details if status is proposed/accepted -->
				</div>
			{/each}
		</div>
	{/if}
</div>
