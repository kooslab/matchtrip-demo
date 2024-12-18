<script lang="ts">
	export let data: { posts: Array<{ title: string; description: string; slug: string }> };
</script>

<div class="container max-w-[1024px] space-y-12 py-12">
	<h1 class="mb-8 text-3xl font-bold tracking-tighter text-foreground dark:text-foreground">
		Blog Posts
	</h1>

	{#each data.posts as post}
		<article class="mb-8">
			<h2 class="text-2xl font-semibold tracking-tighter text-foreground dark:text-foreground">
				<a href={`/blog/${post.slug}`}>{post.title}</a>
			</h2>
			<!-- If you have descriptions -->
			<p class="text-muted-foreground">{post.description}</p>
		</article>
	{/each}
</div>
