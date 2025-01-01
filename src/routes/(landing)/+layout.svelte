<script lang="ts">
	import { type Snippet } from 'svelte';

	import Navbar from './components/navbar.svelte';
	import Footer from './components/footer.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="mx-auto min-h-dvh w-full max-w-7xl px-4 sm:px-8 md:px-12">
	<Navbar />
	<div class="dark:prose-dark prose">
		{@render children?.()}
	</div>
</div>

<Footer />
