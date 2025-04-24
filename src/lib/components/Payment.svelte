<script lang="ts">
	import { onMount } from 'svelte';

	export let amount: number;
	export let onSuccess: (paymentKey: string) => void;
	export let onError: (error: any) => void;

	let paymentWidget: any;

	onMount(async () => {
		// Load Toss Payments SDK
		const script = document.createElement('script');
		script.src = 'https://js.tosspayments.com/v1';
		script.async = true;
		document.head.appendChild(script);

		script.onload = () => {
			// Initialize payment widget
			paymentWidget = (window as any).TossPayments('test_ck_5GePWvyJnrKbD8gVgLzVQx2NnEey');

			// Create payment button
			const button = document.createElement('button');
			button.textContent = 'Pay Now';
			button.className = 'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600';
			button.onclick = async () => {
				try {
					await paymentWidget.requestPayment('CARD', {
						amount,
						orderId: `order_${Date.now()}`,
						orderName: 'Travel Guide Service',
						customerName: 'Customer',
						successUrl: window.location.origin + '/payment/success',
						failUrl: window.location.origin + '/payment/fail'
					});
				} catch (error) {
					onError(error);
				}
			};

			document.getElementById('payment-button')?.appendChild(button);
		};
	});
</script>

<div id="payment-button" class="mt-4"></div>
