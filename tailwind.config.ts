import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts,md}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border) / <alpha-value>)',
				input: 'hsl(var(--input) / <alpha-value>)',
				ring: 'hsl(var(--ring) / <alpha-value>)',
				background: 'hsl(var(--background) / <alpha-value>)',
				foreground: 'hsl(var(--foreground) / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
					foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
					foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
					foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
					foreground: 'hsl(var(--muted-foreground) / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
					foreground: 'hsl(var(--accent-foreground) / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
					foreground: 'hsl(var(--popover-foreground) / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(var(--card) / <alpha-value>)',
					foreground: 'hsl(var(--card-foreground) / <alpha-value>)'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				xl: 'calc(var(--radius) + 4px)',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'caret-blink': 'caret-blink 1.25s ease-out infinite'
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: '65ch',
						color: 'hsl(var(--foreground))',
						'[class~="lead"]': {
							color: 'hsl(var(--foreground))'
						},
						a: {
							color: 'hsl(var(--primary))',
							textDecoration: 'underline',
							fontWeight: '500'
						},
						strong: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600'
						},
						h1: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600'
						},
						h2: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600'
						},
						h3: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600'
						},
						h4: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600'
						},
						h5: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600'
						},
						h6: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600'
						},
						p: {
							color: 'hsl(var(--foreground))'
						},
						li: {
							color: 'hsl(var(--foreground))'
						},
						blockquote: {
							color: 'hsl(var(--foreground))'
						},
						code: {
							color: 'hsl(var(--foreground))'
						},
						th: {
							color: 'hsl(var(--foreground))'
						},
						td: {
							color: 'hsl(var(--foreground))'
						},
						thead: {
							color: 'hsl(var(--foreground))'
						},
						tbody: {
							color: 'hsl(var(--foreground))'
						},
						tfoot: {
							color: 'hsl(var(--foreground))'
						},
						hr: {
							borderColor: 'hsl(var(--border))',
							opacity: 0.3
						},
						'ol > li::marker': {
							color: 'hsl(var(--foreground))'
						},
						'ul > li::marker': {
							color: 'hsl(var(--foreground))'
						},
						em: {
							color: 'hsl(var(--foreground))'
						},
						figcaption: {
							color: 'hsl(var(--muted-foreground))'
						},
						pre: {
							color: 'hsl(var(--foreground))',
							backgroundColor: 'hsl(var(--muted))'
						}
						// ... other default styles ...
					}
				}
			}
		}
	},
	plugins: [tailwindcssAnimate, require('@tailwindcss/typography')]
};

export default config;
