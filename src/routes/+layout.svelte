<script lang="ts">
	import { browser } from '$app/environment';
	import { locale, waitLocale } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import '$lib/i18n';

	import '../app.pcss';
	import type { LayoutData } from './$types';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import Navbar from '$lib/components/navbar.svelte';

	interface Props {
		data: LayoutData;
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	let { supabase, baseMetaTags } = $derived(data);

	// --- Role Management Start ---
	let currentRole = writable<'client' | 'guide'>('client'); // Default to client
	// --- Role Management End ---

	$effect(() => {
		if (browser) {
			locale.set($page.url.searchParams.get('lang') || window.navigator.language);
		}
	});

	let metaTags = $derived(deepMerge(data.baseMetaTags, $page.data.pageMetaTags || {}));
</script>

<ModeWatcher defaultMode="light" />
<Toaster position="top-center" />
<MetaTags {...metaTags} />
<Navbar {currentRole} />
<main class="pt-16">
	{@render children()}
</main>

<style>
</style>
