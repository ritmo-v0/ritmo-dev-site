import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";



const config: Config = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
		"./src/lib/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: ["class"],
	theme: {
    	screens: {
    		xs: "520px",
    		sm: "768px",
    		md: "1024px",
    		lg: "1280px",
    		xl: "1640px"
    	},
    	extend: {
    		borderRadius: {
    			lg: "var(--radius)",
    			md: "calc(var(--radius) - 2px)",
    			sm: "calc(var(--radius) - 4px)",
    			xs: "calc(var(--radius) - 6px)",
    		},
    		colors: {
    			background: "hsl(var(--background))",
    			foreground: "hsl(var(--foreground))",
    			border: "hsl(var(--border))",
    			input: "hsl(var(--input))",
    			ring: "hsl(var(--ring))",
    			card: {
    				DEFAULT: "hsl(var(--card))",
    				foreground: "hsl(var(--card-foreground))",
    			},
    			popover: {
    				DEFAULT: "hsl(var(--popover))",
    				foreground: "hsl(var(--popover-foreground))",
    			},
    			primary: {
    				DEFAULT: "hsl(var(--primary))",
    				foreground: "hsl(var(--primary-foreground))",
    			},
    			secondary: {
    				DEFAULT: "hsl(var(--secondary))",
    				foreground: "hsl(var(--secondary-foreground))",
    			},
    			muted: {
    				DEFAULT: "hsl(var(--muted))",
    				foreground: "hsl(var(--muted-foreground))",
    			},
    			accent: {
    				DEFAULT: "hsl(var(--accent))",
    				foreground: "hsl(var(--accent-foreground))",
    			},
    			destructive: {
    				DEFAULT: "hsl(var(--destructive))",
    				foreground: "hsl(var(--destructive-foreground))",
    			},
    		},
    		fontFamily: {
    			sans: ["var(--font-geist-sans)", "var(--font-noto-sans-tc)", ...defaultTheme.fontFamily.sans],
    			mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono, "var(--font-noto-sans-tc)"],
				serif: ["var(--font-noto-serif-tc)", ...defaultTheme.fontFamily.serif],
    		},
			transitionTimingFunction: {
				"out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
			},
    		keyframes: {
    			"accordion-down": {
    				from: { height: "0" },
    				to: { height: "var(--radix-accordion-content-height)" },
    			},
    			"accordion-up": {
    				from: { height: "var(--radix-accordion-content-height)" },
    				to: { height: "0" },
    			}
    		},
    		animation: {
    			"accordion-down": "accordion-down 0.2s ease-out",
    			"accordion-up": "accordion-up 0.2s ease-out",
    		},
    	}
    },
	plugins: [
		require("tailwindcss-animate")
	],
};

export default config;