
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				ivory: {
					DEFAULT: '#FFFFF0',
					50: '#FFFFFA',
					100: '#FFFFF0',
					200: '#FFFFE0',
					300: '#FFFFD0',
					400: '#FFFFC0',
				},
				stone: {
					DEFAULT: '#A39F94',
					50: '#F8F7F5',
					100: '#F0EFEC',
					200: '#E0DED7',
					300: '#D0CEC3',
					400: '#C0BDB0',
					500: '#A39F94',
					600: '#8C8879',
					700: '#75715F',
					800: '#5E5A4C',
					900: '#474439',
				},
				taupe: {
					DEFAULT: '#483C32',
					50: '#F5F3F2',
					100: '#EBE7E4',
					200: '#D7CFC9',
					300: '#C3B7AE',
					400: '#AFA093',
					500: '#9A8878',
					600: '#86705F',
					700: '#715946',
					800: '#5D472D',
					900: '#483C32',
				},
				midnight: {
					DEFAULT: '#191970',
					50: '#F2F2F9',
					100: '#E5E5F3',
					200: '#CCCCF0',
					300: '#B2B2DE',
					400: '#9999CC',
					500: '#7F7FBB',
					600: '#6666A9',
					700: '#4C4C97',
					800: '#333385',
					900: '#191970',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'fade-in-right': {
					'0%': { opacity: '0', transform: 'translateX(20px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'product-transform': {
					'0%': { transform: 'scale(1) rotate(0deg)' },
					'25%': { transform: 'scale(0.95) rotate(5deg)' },
					'50%': { transform: 'scale(0.9) rotate(180deg)' },
					'75%': { transform: 'scale(0.95) rotate(355deg)' },
					'100%': { transform: 'scale(1) rotate(360deg)' }
				},
				'float': {
					'0%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
					'100%': { transform: 'translateY(0)' }
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out forwards',
				'fade-in-left': 'fade-in-left 0.7s ease-out forwards',
				'fade-in-right': 'fade-in-right 0.7s ease-out forwards',
				'product-transform': 'product-transform 3s ease-in-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
