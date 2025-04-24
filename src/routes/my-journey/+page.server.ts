import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// WARNING: Removed session check and user filtering for debugging.
// This load function now fetches ALL journeys.
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	// Removed session check:
	// const { session } = await safeGetSession();
	// if (!session) { redirect(303, '/'); }

	const { data: journeys, error: dbError } = await supabase
		.from('journeys')
		.select('id, city, days, keywords, journey_details, status, created_at')
		// Removed user filtering: .eq('user_id', session.user.id)
		.order('created_at', { ascending: false });

	if (dbError) {
		console.error('Error fetching all journeys:', dbError);
		error(500, 'Failed to load journeys');
	}

	console.log('journeys', journeys);

	// Return journeys and null session to satisfy type checker
	return { journeys: journeys ?? [], session: null };
};
