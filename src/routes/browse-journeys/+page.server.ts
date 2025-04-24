import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// WARNING: Removed session check and user filtering for debugging.
// This load function now fetches ALL journeys.
export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	// Optional: Add check to ensure only guides can access?
	// For now, we rely on the UI hiding the link.

	const { data: pendingJourneys, error: dbError } = await supabase
		.from('journeys')
		.select('id, city, days, keywords, journey_details, created_at')
		.eq('status', 'pending') // Only fetch pending journeys
		.order('created_at', { ascending: true });

	if (dbError) {
		console.error('Error fetching pending journeys:', dbError);
		error(500, 'Failed to load available journeys');
	}

	return { pendingJourneys: pendingJourneys ?? [], session: null };
};
