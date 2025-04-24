import { json, error } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

// WARNING: Using Service Role Key grants full admin access.
const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export async function POST({ request }) {
	try {
		const proposalData = await request.json();

		// Basic validation
		if (
			!proposalData ||
			!proposalData.journey_id ||
			!proposalData.message ||
			proposalData.cost == null
		) {
			error(400, 'Missing required proposal data');
		}

		// TODO: Add server-side check: Does the journey_id exist and is its status 'pending'?
		// const { data: journeyCheck, error: journeyError } = await supabase
		//   .from('journeys')
		//   .select('status')
		//   .eq('id', proposalData.journey_id)
		//   .single();
		// if (journeyError || !journeyCheck || journeyCheck.status !== 'pending') {
		//   error(404, 'Journey not found or not available for proposals.');
		// }

		// Insert the proposal
		// Note: guide_id is omitted for now.
		const { error: insertError } = await supabase.from('proposals').insert([
			{
				journey_id: proposalData.journey_id,
				message: proposalData.message,
				cost: proposalData.cost,
				status: proposalData.status || 'pending'
				// guide_id: ??? // Would need user context here
			}
		]);

		if (insertError) {
			console.error('Supabase proposal insert error:', insertError);
			error(500, insertError.message || 'Database error submitting proposal');
		}

		// Update the journey status to 'proposed'
		const { error: updateError } = await supabase
			.from('journeys')
			.update({ status: 'proposed' })
			.eq('id', proposalData.journey_id);

		// Log update error but don't necessarily fail the request if insert succeeded?
		// Or handle this transactionally.
		if (updateError) {
			console.error('Supabase journey update error:', updateError);
			// Potentially return a success but log the warning
		}

		return json({ message: 'Proposal submitted successfully' }, { status: 201 });
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
