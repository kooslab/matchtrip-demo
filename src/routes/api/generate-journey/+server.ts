import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request }) {
	try {
		const { city, days, keywords } = await request.json();

		const prompt = `Create 3 different travel itinerary options for ${city} for ${days} days. 
    Focus on these interests: ${keywords}.
    Each option should be unique and include a mix of activities, restaurants, and attractions.
    Format each option as a concise paragraph.`;

		const completion = await openai.chat.completions.create({
			messages: [{ role: 'user', content: prompt }],
			model: 'gpt-3.5-turbo'
		});

		const response = completion.choices[0].message.content;
		const options = response?.split('\n\n').filter((opt) => opt.trim().length > 0);

		return json({ options });
	} catch (error) {
		console.error('Error generating journey:', error);
		return json({ error: 'Failed to generate journey options' }, { status: 500 });
	}
}
