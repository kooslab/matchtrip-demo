<script lang="ts">
	export let data: { posts: Array<{ slug: string; title: string; description: string }> };
</script>

<div class="blog-list">
	{#each data.posts as { slug, title, description }}
		<div class="blog-post">
			<h2><a href={`/blog/${slug}`}>{title}</a></h2>
			<p>{description}</p>
		</div>
	{/each}
</div>
