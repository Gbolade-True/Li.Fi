import type { Config } from 'tailwindcss';

const scrollbar = require('tailwind-scrollbar');
const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	darkMode: 'class',
	safelist: [
		//Tailwind will sometimes (or always) delete the classes if we generate the classes dynamically using getColor() function, to get over it, we must use safelist
		// https://tailwindcss.com/docs/content-configuration#safelisting-classes
		{
			pattern: /text-(text|primary|secondary|desctructionary|misc|bg|bgAlert|alert|success)-(1|2|3|4|5|6|7|8)-d/,
			variants: ['dark']
		},
		{
			pattern: /bg-(text|primary|secondary|desctructionary|misc|bg|bgAlert|alert|success)-(1|2|3|4|5|6|7|8)-d/,
			variants: ['dark']
		}
	],
	theme: {
		// Keep in mind that every change in screen breakpoints should also be reflected in ./styles/index.ts in ScreenSizes enum
		screens: {
			xsm: '375px',
			sm: '640px',
			md: '744px',
			lg: '1024px',
			xl: '1280px',
			xxl: '1440px',
			xxxl: '1720px',
			xxxxl: '1920x'
		},
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
				montserrat: ["'Montserrat', sans-serif", ...defaultTheme.fontFamily.sans]
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			keyframes: {
				pump: {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.3)' },
					'100%': { transform: 'scale(1)' }
				}
			},
			animation: {
				pump: 'pump 400ms linear'
			},
			colors: {
				primary: {
					default: '#0C76D4',
					1: '#0C76D4',
					2: '#0B6CC1',
					3: '#0A5EA9',
					4: '#0057A3',
					5: '#9C1AFF',
					6: '#A733FF',
					7: '#C170FF',
					8: '#CE8FFF',
					'1-d': '#0C76D4',
					'2-d': '#0B6CC1',
					'3-d': '#0A5EA9',
					'4-d': '#0057A3',
					'5-d': '#9C1AFF',
					'6-d': '#A733FF',
					'7-d': '#C170FF',
					'8-d': '#CE8FFF'
				},
				secondary: {
					default: '#EBEDF0',
					1: '#F7FAFC',
					2: '#DCE0E5',
					3: '#CBD0D7',
					4: '#99A4B2',
					5: '#4F5A68',
					6: '#2C323A',
					7: '#1A1E23',
					8: '#1A1E23',
					9: '#442D7C',
					'1-d': '#424B57',
					'2-d': '#485360',
					'3-d': '#4F5A69',
					'4-d': '#637183',
					'5-d': '#8592A3',
					'6-d': '#B6BEC8',
					'7-d': '#E2E5E9',
					'8-d': '#E2E5E9',
					'9-d': '#F7FAFC'
				},
				desctructionary: {
					default: '#EBEDF0',
					1: '#EBEDF0',
					2: '#DCE0E5',
					3: '#CBD0D7',
					4: '#99A4B2',
					5: '#4F5A68',
					6: '#2C323A',
					7: '#1A1E23',
					8: '#1A1E23',
					'1-d': '#424B57',
					'2-d': '#485360',
					'3-d': '#4F5A69',
					'4-d': '#637183',
					'5-d': '#8592A3',
					'6-d': '#B6BEC8',
					'7-d': '#E2E5E9',
					'8-d': '#E2E5E9'
				},
				misc: {
					default: '#FFFFFF',
					1: '#FFFFFF',
					2: '#000000',
					3: '#B00000',
					4: '#0583FF',
					5: '#00AF7C',
					'1-d': '#FFFFFF',
					'2-d': '#000000',
					'3-d': '#B00000',
					'4-d': '#0583FF',
					'5-d': '#00AF7C'
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
				bgAlert: {
					default: '#efd9d9',
					1: '#efd9d9',
					'1-d': '#efd9d9'
				},
				alert: {
					default: '#ED5F74',
					1: '#ED5F74',
					2: '#CD3D64',
					3: '#BB1E58',
					4: '#A41C4E',
					'1-d': '#ED5F74',
					'2-d': '#CD3D64',
					'3-d': '#BB1E58',
					'4-d': '#A41C4E'
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
					default: '#00855F',
					1: '#00855F'
				}
			},
			boxShadow: {
				'elevation-1': '0px 0px 1px rgba(10, 22, 70, 0.2), 0px 1px 1px rgba(10, 22, 70, 0.1);',
				'elevation-2': '0px 0px 2px rgba(0, 0, 0, 0.1), 0px 0px 8px rgba(0, 1, 3, 0.1);',
				'elevation-3': '0px 0px 1px rgba(10, 22, 70, 0.16), 0px 6px 6px rgba(10, 22, 70, 0.15);',
				'elevation-4': '0px 0px 1px rgba(10, 22, 70, 0.2), 0px 16px 16px rgba(10, 22, 70, 0.15);',
				'elevation-5': '0px 0px 3px rgba(10, 22, 70, 0.2), 0px 32px 40px rgba(10, 22, 71, 0.2);',
				'focus-state-1': '0px 1px 16px rgba(0, 10, 200, 0.35), 0px 1px 4px rgba(0, 0, 0, 0.2);',
				'focus-state-2': '0px 1px 16px rgba(0, 10, 200, 0.7), 0px 1px 4px rgba(0, 0, 0, 0.2);',
				'focus-state-3': '0px 1px 16px #000AC8, 0px 1px 4px rgba(0, 0, 0, 0.2);',
				'floating-action-1': '0px 0px 1px rgba(10, 22, 70, 0.2), 0px 0px 16px rgba(10, 22, 70, 0.1);',
				'floating-action-2': '0px 0px 1px rgba(10, 22, 70, 0.2), 0px 0px 16px rgba(10, 22, 70, 0.3);'
			},
			borderRadius: {
				elevation: '8px'
			},
			gridTemplateColumns: {
				list: 'fit-content(200px) minmax(0,1fr)',
				aside: 'auto 1fr'
			},
			gridTemplateRows: {
				card: '1fr auto'
			}
		}
	},
	variants: {
		scrollbar: ['dark', 'rounded']
	},
	plugins: [scrollbar]
};
export default config;
