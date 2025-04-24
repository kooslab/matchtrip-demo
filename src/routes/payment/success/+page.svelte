<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		setTimeout(() => {
			goto('/');
		}, 3000);
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100">
	<div class="rounded-lg bg-white p-8 text-center shadow-lg">
		<div class="mb-4 text-6xl text-green-500">✓</div>
		<h1 class="mb-2 text-2xl font-bold">Payment Successful!</h1>
		<p class="text-gray-600">
			Thank you for your payment. You will be redirected to the home page shortly.
		</p>
	</div>
</div>
