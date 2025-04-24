import { json } from '@sveltejs/kit';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function POST({ request }) {
	try {
		console.log('Generating journey...');
		const { city, days, keywords } = await request.json();
		console.log('City:', city);
		console.log('Days:', days);
		console.log('Keywords:', keywords);

		const prompt = `Create 3 different travel itinerary options for a trip to ${city} for ${days} days. 
    Focus on these interests: ${keywords}.
    Each option should be unique and include a mix of activities, restaurants, and attractions.
    Respond entirely in Korean.
    Format the response ONLY as a valid JSON object with keys "option_1", "option_2", and "option_3".
    The value for each key should be the itinerary description formatted as Markdown.`;

		const completion = await openai.chat.completions.create({
			messages: [{ role: 'user', content: prompt }],
			model: 'gpt-4o-mini',
			response_format: { type: 'json_object' }
		});

		const responseContent = completion.choices[0].message.content;
		console.log('Raw OpenAI Response:', responseContent);

		if (!responseContent) {
			throw new Error('OpenAI returned empty content.');
		}

		let optionsData: { [key: string]: string };
		try {
			optionsData = JSON.parse(responseContent);
		} catch (parseError) {
			console.error('Failed to parse OpenAI JSON response:', parseError);
			throw new Error('Failed to understand itinerary options from AI.');
		}

		console.log('Generated options (JSON):', optionsData);
		return json({ options: optionsData });
	} catch (error) {
		console.error('Error generating journey:', error);
		return json({ error: 'Failed to generate journey options' }, { status: 500 });
	}
}
