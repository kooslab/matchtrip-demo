import type { PageLoad } from './$types';
import { getBlogPosts } from '$lib/utils/getBlogPosts';

export const load: PageLoad = async () => {
	const posts = getBlogPosts();
	return {
		posts
	};
};
