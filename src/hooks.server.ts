import { createServerClient } from '@supabase/ssr';
import { type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

const supabase: Handle = async ({ event, resolve }) => {
	// WARNING: Using Service Role Key here bypasses user authentication for server-side client.
	// This is generally NOT recommended for user-facing requests.
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			getAll: () => event.cookies.getAll(),
			/**
			 * SvelteKit's cookies API requires `path` to be explicitly set in
			 * the cookie options. Setting `path` to `/` replicates previous/
			 * standard behavior.
			 */
			setAll: (cookiesToSet) => {
				cookiesToSet.forEach(({ name, value, options }) => {
					event.cookies.set(name, value, { ...options, path: '/' });
				});
			}
		}
	});

	// Remove safeGetSession as we are bypassing user auth here
	event.locals.safeGetSession = async () => {
		// Return null session explicitly
		return { session: null, user: null };
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			/**
			 * Supabase libraries use the `content-range` and `x-supabase-api-version`
			 * headers, so we need to tell SvelteKit to pass it through.
			 */
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

// const authGuard: Handle = async ({ event, resolve }) => {
// 	const { session, user } = await event.locals.safeGetSession();
// 	event.locals.session = session;
// 	event.locals.user = user;

// 	if (!event.locals.session && event.url.pathname.startsWith('/app')) {
// 		redirect(303, '/login');
// 	}

// 	if (event.locals.session && event.url.pathname === '/login') {
// 		redirect(303, '/app');
// 	}

// 	return resolve(event);
// };

export const handle: Handle = sequence(supabase);
