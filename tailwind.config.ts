import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Semantic color system
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				card: 'var(--card)',
				'card-foreground': 'var(--card-foreground)',
				popover: 'var(--popover)',
				'popover-foreground': 'var(--popover-foreground)',
				primary: 'var(--primary)',
				'primary-foreground': 'var(--primary-foreground)',
				secondary: 'var(--secondary)',
				'secondary-foreground': 'var(--secondary-foreground)',
				muted: 'var(--muted)',
				'muted-foreground': 'var(--muted-foreground)',
				accent: 'var(--accent)',
				'accent-foreground': 'var(--accent-foreground)',
				destructive: 'var(--destructive)',
				'destructive-foreground': 'var(--destructive-foreground)',
				border: 'var(--border)',
				input: 'var(--input)',
				ring: 'var(--ring)',
				
				// dTech Vision Brand Colors
				'corporate-navy': 'var(--corporate-navy)',
				'brand-purple': 'var(--brand-purple)',
				'aqua': 'var(--aqua)',
				'orange': 'var(--orange)',
				
				// dTech Vision Neutral Colors
				'premium-white': 'var(--premium-white)',
				'off-white': 'var(--off-white)',
				'light-gray': 'var(--light-gray)',
				'medium-gray': 'var(--medium-gray)',
				'sophisticated-gray': 'var(--sophisticated-gray)',
				'dark-surface': 'var(--dark-surface)',
				'deep-black': 'var(--deep-black)',
				
				// dTech Vision Supporting Purple Family
				'refined-purple': 'var(--refined-purple)',
				'accent-lavender': 'var(--accent-lavender)',
				
				// dTech Vision Theme Colors
				'accent-low': 'var(--accent-low)',
				'accent-high': 'var(--accent-high)',
				'accent-low-light': 'var(--accent-low-light)',
				'accent-high-light': 'var(--accent-high-light)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
} satisfies Config;
