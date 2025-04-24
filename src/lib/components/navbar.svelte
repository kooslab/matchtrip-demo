<!-- Basic navbar component -->
<script lang="ts">
	import { page } from '$app/stores';
	import type { Writable } from 'svelte/store';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toggleMode, mode } from 'mode-watcher'; // Import mode-watcher functions/store
	import { Sun, Moon, Menu, X } from 'lucide-svelte'; // Import icons
	import { navigating } from '$app/stores'; // Import navigating store

	interface Props {
		currentRole: Writable<'client' | 'guide'>;
	}

	let { currentRole }: Props = $props();
	let isMobileMenuOpen = $state(false); // Use $state for reactivity

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

	// Close mobile menu on navigation
	$effect(() => {
		if ($navigating) {
			isMobileMenuOpen = false;
		}
	});

	function toggleMobileMenu() {
		console.log('Toggling mobile menu, new state:', !isMobileMenuOpen);
		isMobileMenuOpen = !isMobileMenuOpen;
	}

	console.log('current isMobileMenuOpen:', isMobileMenuOpen);
</script>

<nav
	class="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container flex h-16 items-center justify-between">
		<div class="flex items-center">
			<a class="mr-6 flex items-center space-x-2" href="/">
				<span class="font-bold">MatchTrip</span>
			</a>
			<!-- Desktop Navigation Links -->
			<nav class="hidden items-center space-x-6 text-sm font-medium md:flex">
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

		<!-- Desktop Toggles -->
		<div class="hidden items-center space-x-4 md:flex">
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
		</div>

		<!-- Mobile Menu Button -->
		<div class="md:hidden">
			<Button variant="ghost" size="icon" onclick={toggleMobileMenu}>
				{#if isMobileMenuOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
				<span class="sr-only">Toggle menu</span>
			</Button>
		</div>
	</div>
</nav>

<!-- Mobile Menu -->
{#if isMobileMenuOpen}
	<div
		class="fixed bottom-0 right-0 top-16 z-40 overflow-y-auto border-t border-border/40 bg-background/95 shadow-lg md:hidden"
	>
		<div class="space-y-4 px-4 py-6">
			<!-- Mobile Navigation Links -->
			<nav class="flex flex-col space-y-2 text-sm font-medium">
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

			<!-- Mobile Toggles -->
			<div class="flex items-center justify-between border-t pt-4">
				<span class="mr-2 text-sm text-muted-foreground">현재: {currentRoleDisplay}</span>
				<Button variant="outline" size="sm" onclick={toggleRole}>
					{switchToRoleDisplay} 전환
				</Button>
			</div>
			<div class="flex items-center justify-between border-t pt-4">
				<span class="text-sm text-muted-foreground">테마</span>
				<Button variant="ghost" size="icon" onclick={toggleMode}>
					{#if currentMode === 'light'}
						<Sun class="h-5 w-5" />
					{:else}
						<Moon class="h-5 w-5" />
					{/if}
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	nav a {
		@apply block rounded-md px-3 py-2 text-foreground/60 transition-colors hover:bg-accent hover:text-foreground/80;
	}

	nav a.active {
		@apply bg-accent font-semibold text-foreground;
	}

	/* Adjust desktop link styling if needed */
	.md\:flex nav a {
		@apply inline-block rounded-none bg-transparent p-0 hover:bg-transparent;
	}

	.md\:flex nav a.active {
		@apply bg-transparent font-semibold text-foreground;
	}
</style>
