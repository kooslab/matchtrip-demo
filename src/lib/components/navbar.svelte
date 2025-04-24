<!-- Basic navbar component -->
<script lang="ts">
	import { page } from '$app/stores';
	import type { Writable } from 'svelte/store';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toggleMode, mode } from 'mode-watcher'; // Import mode-watcher functions/store
	import { Sun, Moon } from 'lucide-svelte'; // Import icons

	interface Props {
		currentRole: Writable<'client' | 'guide'>;
	}

	let { currentRole }: Props = $props();

	function toggleRole() {
		console.log('Toggling role...');
		currentRole.update((role) => {
			const newRole = role === 'client' ? 'guide' : 'client';
			console.log('New role will be:', newRole);
			return newRole;
		});
	}

	// Role display text mapping
	const roleDisplayNames = {
		client: '여행자',
		guide: '가이드'
	};

	// Use $derived for reactive calculations
	let currentRoleDisplay = $derived(roleDisplayNames[$currentRole]);
	let switchToRoleDisplay = $derived(
		roleDisplayNames[$currentRole === 'client' ? 'guide' : 'client']
	);

	// Reactive variable for current theme mode
	let currentMode = $derived($mode);
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
					<a href="/new-journey" class:active={$page.url.pathname === '/new-journey'}>새 여행</a>
					<a href="/my-journey" class:active={$page.url.pathname.startsWith('/my-journey')}
						>나의 여행</a
					>
				{:else}
					<a
						href="/browse-journeys"
						class:active={$page.url.pathname.startsWith('/browse-journeys')}>여행 찾아보기</a
					>
				{/if}
			</nav>
		</div>

		<div class="flex items-center space-x-4">
			<span class="text-sm text-muted-foreground"
				>현재 모드: <span class="font-semibold">{currentRoleDisplay}</span></span
			>
			<Button variant="outline" size="sm" onclick={toggleRole}>
				{switchToRoleDisplay} 모드로 전환
			</Button>
			<!-- Theme Toggle Button -->
			<Button variant="ghost" size="icon" onclick={toggleMode}>
				{#if currentMode === 'light'}
					<Sun class="h-5 w-5" />
				{:else}
					<Moon class="h-5 w-5" />
				{/if}
				<span class="sr-only">Toggle theme</span>
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
