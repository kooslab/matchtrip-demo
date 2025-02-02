const posts = import.meta.glob('./**/+page.md');

export const load = async () => {
	const allPosts = await Promise.all(
		Object.entries(posts).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const slug = path.split('/')[1];

			// Parse date and validate it
			const parsedDate = new Date(metadata.date || '');
			const date = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

			return {
				slug,
				...metadata,
				date
			};
		})
	);

	// Sort posts by date in descending order (newest first)
	const sortedPosts = allPosts.sort((a, b) => b.date.getTime() - a.date.getTime());

	return {
		posts: sortedPosts
	};
};
