<script lang="ts">
	// No script needed for simple landing page for now
	// Supabase client is available from layout if needed later: $page.data.supabase
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<section class="container mx-auto flex flex-col items-center px-4 py-24 text-center">
	<h1 class="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
		Find Your Perfect Travel Guide
	</h1>
	<p class="mb-8 text-lg text-muted-foreground md:text-xl">
		Connect with local experts who can tailor your dream journey. Plan your trip, get proposals, and
		travel with confidence.
	</p>
	<div class="flex space-x-4">
		<Button size="lg" href="/new-journey">Plan a New Journey</Button>
		{#if false}
			<!-- Placeholder: Check if user is logged in to show relevant button -->
			<Button size="lg" variant="outline">Explore Guides</Button>
		{/if}
	</div>
</section>

<section class="bg-secondary py-16">
	<div class="container mx-auto px-4 text-center">
		<h2 class="mb-8 text-3xl font-bold">How It Works</h2>
		<div class="grid gap-8 md:grid-cols-3">
			<div class="flex flex-col items-center">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					1
				</div>
				<h3 class="mb-2 text-xl font-semibold">Plan Your Trip</h3>
				<p class="text-muted-foreground">
					Tell us where you want to go, for how long, and your interests. We'll generate itinerary
					options.
				</p>
			</div>
			<div class="flex flex-col items-center">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					2
				</div>
				<h3 class="mb-2 text-xl font-semibold">Get Proposals</h3>
				<p class="text-muted-foreground">
					Local guides will see your request and send personalized proposals with their expertise
					and cost.
				</p>
			</div>
			<div class="flex flex-col items-center">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					3
				</div>
				<h3 class="mb-2 text-xl font-semibold">Choose & Travel</h3>
				<p class="text-muted-foreground">
					Select the guide that fits best, finalize the details, and embark on your unforgettable
					journey!
				</p>
			</div>
		</div>
	</div>
</section>
