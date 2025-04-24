<script lang="ts">
	// No script needed for simple landing page for now
	// Supabase client is available from layout if needed later: $page.data.supabase
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<section class="container mx-auto flex flex-col items-center px-4 py-24 text-center">
	<h1 class="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
		완벽한 현지 여행 가이드 찾기
	</h1>
	<p class="mb-8 text-lg text-muted-foreground md:text-xl">
		꿈꿔왔던 여행을 만들어 줄 현지 전문가와 연결해 보세요. 여행을 계획하고, 제안을 받고, 안심하고
		여행하세요.
	</p>
	<div class="flex space-x-4">
		<Button size="lg" href="/new-journey">새 여행 계획하기</Button>
		{#if false}
			<!-- Placeholder: Check if user is logged in to show relevant button -->
			<Button size="lg" variant="outline">가이드 둘러보기</Button>
		{/if}
	</div>
</section>

<section class="bg-secondary py-16">
	<div class="container mx-auto px-4 text-center">
		<h2 class="mb-8 text-3xl font-bold">MatchTrip 이용 방법</h2>
		<div class="grid gap-8 md:grid-cols-3">
			<div class="flex flex-col items-center">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					1
				</div>
				<h3 class="mb-2 text-xl font-semibold">여행 계획하기</h3>
				<p class="text-muted-foreground">
					가고 싶은 곳, 여행 기간, 관심사를 알려주세요. 맞춤 여행 옵션을 제안해 드립니다.
				</p>
			</div>
			<div class="flex flex-col items-center">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					2
				</div>
				<h3 class="mb-2 text-xl font-semibold">가이드 제안 받기</h3>
				<p class="text-muted-foreground">
					현지 가이드가 당신의 여행 계획을 보고 전문 지식과 비용을 담은 맞춤 제안을 보냅니다.
				</p>
			</div>
			<div class="flex flex-col items-center">
				<div
					class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
				>
					3
				</div>
				<h3 class="mb-2 text-xl font-semibold">선택 및 여행 시작</h3>
				<p class="text-muted-foreground">
					가장 마음에 드는 가이드를 선택하고 세부 사항을 조율한 후, 잊지 못할 여행을 시작하세요!
				</p>
			</div>
		</div>
	</div>
</section>
