const posts = import.meta.glob('./**/+page.md');

export const load = async () => {
	const allPosts = await Promise.all(
		Object.entries(posts).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/')[1]; // Gets the directory name
			return {
				slug,
				...metadata
			};
		})
	);

	return {
		posts: allPosts
	};
};
