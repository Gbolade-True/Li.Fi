import type { Config } from 'tailwindcss';

const scrollbar = require('tailwind-scrollbar');

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	darkMode: 'class',
	safelist: [
		{
			pattern: /text-(text|primary|secondary|bg|success)-(1|2|3|4|5|6|7|8)-d/,
			variants: ['dark']
		},
		{
			pattern: /bg-(text|primary|secondary|bg|success)-(1|2|3|4|5|6|7|8)-d/,
			variants: ['dark']
		}
	],
	theme: {
		fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '4rem'
		},
		extend: {
			fontFamily: {
				montserrat: ["'Montserrat', sans-serif"]
			},
			keyframes: {
				scaleUp: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.2)' },
					'100%': { transform: 'scale(1)' }
				}
			},
			animation: {
				scaleUp: 'scaleUp 0.3s ease-in-out'
			},
			colors: {
				primary: {
					default: '#0C76D4',
					1: '#0C76D4',
					2: '#0B6CC1',
					'1-d': '#0C76D4',
					'2-d': '#0B6CC1'
				},
				secondary: {
					default: '#EBEDF0',
					1: '#F7FAFC',
					2: '#DCE0E5',
					'1-d': '#424B57',
					'2-d': '#485360'
				},
				bg: {
					default: '#ECF3F8',
					1: '#ECF3F8',
					2: '#FFFFFF',
					3: '#FFFFFF',
					4: '#EBEDF0',
					5: '#DCE0E5',
					6: '#ECF3F8',
					'1-d': '#19181B',
					'2-d': '#232930',
					'3-d': '#2B323B',
					'4-d': '#2F3741',
					'5-d': '#2B323B',
					'6-d': '#3E2673'
				},
				text: {
					default: '#040404',
					1: '#040404',
					2: '#515151',
					3: '#676767',
					4: '#0000F0',
					'4_': '#0050f0',
					5: '#595959',
					'1-d': '#FFFFFF',
					'2-d': '#D6D6D6',
					'3-d': '#BFBFBF',
					'4-d': '#51ABFF',
					'4_-d': '#5194ff',
					'5-d': '#FFFFFF'
				},
				success: {
					1: '#22BB33',
					'1-d': '#22BB33'
				}
			}
		}
	},
	variants: {
		scrollbar: ['dark', 'rounded']
	},
	plugins: [scrollbar]
};
export default config;
