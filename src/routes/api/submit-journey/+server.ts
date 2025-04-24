import { json, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public'; // URL can be public
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'; // Use Service Role Key for inserts

// Initialize Supabase client with Service Role Key
// WARNING: Service Role Key grants full admin access.
const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST({ request }) {
	try {
		const journeyData = await request.json();

		// Basic validation (can add more robust validation)
		if (!journeyData || !journeyData.city || !journeyData.days || !journeyData.journey_details) {
			error(400, 'Missing required journey data');
		}

		// Insert into database
		// Note: user_id is omitted as per the decision to remove session logic for now.
		// If RLS is enabled based on user_id, inserts might fail or require adjustment.
		const { data, error: dbError } = await supabase
			.from('journeys')
			.insert([
				{
					city: journeyData.city,
					days: journeyData.days,
					keywords: journeyData.keywords,
					journey_details: journeyData.journey_details,
					status: journeyData.status || 'pending'
				}
			])
			.select() // Optionally select the inserted data to return
			.single(); // Assuming you want the single inserted record

		if (dbError) {
			console.error('Supabase insert error:', dbError);
			error(500, dbError.message || 'Database error during journey submission');
		}

		return json({ message: 'Journey submitted successfully', journey: data }, { status: 201 }); // 201 Created
	} catch (err: unknown) {
		console.error('API Error:', err);
		// Check if it's an error thrown by our validation or SvelteKit
		if (typeof err === 'object' && err !== null && 'status' in err) {
			throw err; // Re-throw SvelteKit/validation errors
		}
		// Handle other error types or provide a generic message
		const message = err instanceof Error ? err.message : 'Internal Server Error';
		error(500, message);
	}
}
