<script lang="ts">
	import { type Snippet } from 'svelte';

	import Navbar from './components/navbar.svelte';
	import Footer from './components/footer.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="min-h-dvh">
	<Navbar />
	<div class="container mx-auto max-w-[1024px] p-4">
		<div class="prose dark:prose-dark">
			{@render children?.()}
		</div>
	</div>
</div>

<Footer />
