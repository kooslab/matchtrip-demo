<script lang="ts">
	import LogoContainer from './logo-container.svelte';
	import NavButtons from './nav-buttons.svelte';
	import MobileMenu from './mobile-menu.svelte';

	let scrollY: number = $state(0);
</script>

<svelte:window bind:scrollY />

<header
	class="sticky top-0 z-50 w-full border-border bg-background {scrollY > 0 ? 'border-b' : ''}"
>
	<nav class="container flex w-full items-center space-x-8 py-4">
		<LogoContainer />
		<NavButtons />
		<MobileMenu />
	</nav>
</header>
