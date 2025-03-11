/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  typography: (theme) => ({
			DEFAULT: {
			  css: {
				color: theme('colors.gray.700'),
				a: {
				  color: theme('colors.blue.500'),
				  '&:hover': {
					color: theme('colors.blue.700')
				  },
				  code: { color: theme('colors.blue.400') }
				},
				'h2,h3,h4': {
				  'scroll-margin-top': theme('spacing.32')
				},
				thead: {
				  borderBottomColor: theme('colors.gray.200')
				},
				code: { color: theme('colors.pink.500') },
				'blockquote p:first-of-type::before': false,
				'blockquote p:last-of-type::after': false
			  }
			},
			dark: {
			  css: {
				color: theme('colors.gray.200'),
				a: {
				  color: theme('colors.blue.400'),
				  '&:hover': {
					color: theme('colors.blue.600')
				  },
				  code: { color: theme('colors.blue.400') }
				},
				blockquote: {
				  borderLeftColor: theme('colors.gray.700'),
				  color: theme('colors.gray.300')
				},
				'h1,h2,h3,h4': {
				  color: theme('colors.gray.100')
				},
				hr: { borderColor: theme('colors.gray.700') },
				ol: {
				  li: {
					'&:before': { color: theme('colors.gray.500') }
				  }
				},
				ul: {
				  li: {
					'&:before': { backgroundColor: theme('colors.gray.500') }
				  }
				},
				strong: { color: theme('colors.gray.100') },
				thead: {
				  th: {
					color: theme('colors.gray.100')
				  },
				  borderBottomColor: theme('colors.gray.600')
				},
				tbody: {
				  tr: {
					borderBottomColor: theme('colors.gray.700')
				  }
				}
			  }
			}
		  })
  	}
  },
  plugins: [require("tailwindcss-animate"),require('@tailwindcss/typography'),require('tailwindcss-opentype')],
};
