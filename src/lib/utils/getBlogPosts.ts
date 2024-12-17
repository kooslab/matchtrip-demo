import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function getBlogPosts() {
	try {
		const blogDir = path.resolve('src/routes/(landing)/blog');
		const files = fs.readdirSync(blogDir);

		return files
			.filter((file) => fs.statSync(path.join(blogDir, file)).isDirectory())
			.map((folder) => {
				const filePath = path.join(blogDir, folder, '+page.md');
				if (!fs.existsSync(filePath)) {
					console.warn(`File not found: ${filePath}`);
					return null;
				}
				const fileContent = fs.readFileSync(filePath, 'utf-8');
				const { data } = matter(fileContent);
				return {
					slug: folder,
					...data
				};
			})
			.filter((post) => post !== null); // Filter out any null entries
	} catch (error) {
		console.error('Error reading blog posts:', error);
		return [];
	}
}
