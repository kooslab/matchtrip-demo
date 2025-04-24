<!-- Basic navbar component -->
<script lang="ts">
	import { page } from '$app/stores';
	import type { Writable } from 'svelte/store';
	import Button from '$lib/components/ui/button/button.svelte';

	interface Props {
		currentRole: Writable<'client' | 'guide'>;
	}

	let { currentRole }: Props = $props();

	function toggleRole() {
		currentRole.update((role) => (role === 'client' ? 'guide' : 'client'));
	}
</script>

<nav
	class="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-16 items-center justify-between">
		<div class="flex items-center">
			<a class="mr-6 flex items-center space-x-2" href="/">
				<span class="font-bold">MatchTrip</span>
			</a>
			<nav class="flex items-center space-x-6 text-sm font-medium">
				{#if $currentRole === 'client'}
					<a href="/new-journey" class:active={$page.url.pathname === '/new-journey'}>New Journey</a
					>
					<a href="/my-journey" class:active={$page.url.pathname.startsWith('/my-journey')}
						>My Journeys</a
					>
				{:else}
					<a
						href="/browse-journeys"
						class:active={$page.url.pathname.startsWith('/browse-journeys')}>Browse Journeys</a
					>
				{/if}
			</nav>
		</div>

		<div class="flex items-center space-x-4">
			<span class="text-sm text-muted-foreground"
				>Current View: <span class="font-semibold capitalize">{$currentRole}</span></span
			>
			<Button variant="outline" size="sm" onclick={toggleRole}>
				Switch to {$currentRole === 'client' ? 'Guide' : 'Client'} View
			</Button>
			<!-- Add Login/Logout buttons here if needed later -->
		</div>
	</div>
</nav>

<style lang="postcss">
	nav a {
		@apply text-foreground/60 transition-colors hover:text-foreground/80;
	}

	nav a.active {
		@apply text-foreground;
	}
</style>
