// generateBlogData.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const blogDir = path.resolve('src/routes/(landing)/blog');
const outputFilePath = path.resolve('static/blogData.json');

function generateBlogData() {
	try {
		const files = fs.readdirSync(blogDir);
		const posts = files
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
			.filter((post) => post !== null);

		fs.writeFileSync(outputFilePath, JSON.stringify(posts, null, 2));
		console.log('Blog data generated successfully.');
	} catch (error) {
		console.error('Error generating blog data:', error);
	}
}

generateBlogData();
