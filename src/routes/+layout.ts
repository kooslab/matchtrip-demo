import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { type MetaTagsProps } from 'svelte-meta-tags';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, url, fetch }) => {
	/**
	 * Declare a dependency so the layout can be invalidated, for example, on
	 * session refresh.
	 */
	// Initialize supabase client (using PUBLIC ANON key)
	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					getAll() {
						return data.cookies;
					}
				}
			});

	const title = `Kooslab`;
	const description = `Transform your software vision into reality with expert requirements analysis and wireframing. We help SMBs build the right solution, the first time.`;
	const canonicalUrl = new URL(url.pathname, url.origin).href;
	const OGImage = 'https://media.fromkian.com/acme.jpg';

	const baseMetaTags: MetaTagsProps = {
		title,
		titleTemplate: `%s — ${title}`,
		description,
		canonical: canonicalUrl,
		openGraph: {
			type: 'website',
			url: canonicalUrl,
			locale: 'en_US',
			title,
			description,
			siteName: title,
			images: [
				{
					url: OGImage,
					alt: title,
					width: 1200,
					height: 630,
					type: 'image/png'
				}
			]
		},
		twitter: {
			creator: `@example`,
			site: `@example`,
			cardType: 'summary_large_image',
			description,
			image: OGImage,
			imageAlt: description
		}
	};

	return { supabase, baseMetaTags, cookies: data.cookies, session: null };
};
