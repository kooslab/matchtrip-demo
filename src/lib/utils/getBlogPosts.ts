import fs from 'fs';
import path from 'path';

export function getBlogPosts() {
	try {
		const filePath = path.resolve('static/blogData.json');
		if (!fs.existsSync(filePath)) {
			console.error('Blog data file not found.');
			return [];
		}
		const fileContent = fs.readFileSync(filePath, 'utf-8');
		return JSON.parse(fileContent);
	} catch (error) {
		console.error('Error reading blog data:', error);
		return [];
	}
}
