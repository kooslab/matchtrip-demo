<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let journeys = $derived(data.journeys);
</script>

<div class="container mx-auto px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold">My Submitted Journeys</h1>

	{#if journeys.length === 0}
		<p class="text-gray-500">You haven't submitted any journeys yet.</p>
	{:else}
		<div class="space-y-6">
			{#each journeys as journey (journey.id)}
				<div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
					<div class="mb-4 flex items-center justify-between">
						<h2 class="text-xl font-semibold">
							{journey.city} - {journey.days} day(s)
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
							{journey.status}
						</span>
					</div>
					<p class="mb-2 text-muted-foreground">Keywords: {journey.keywords || 'None'}</p>
					<p class="mb-4 whitespace-pre-wrap">{journey.journey_details}</p>
					<p class="text-sm text-muted-foreground">
						Submitted: {new Date(journey.created_at).toLocaleString()}
					</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
