/** @type {import('tailwindcss').Config} */

const daisy = require("daisyui");
const plugin = require("tailwindcss/plugin");

// const themes = require('daisyui/src/colors/themes')

const childrenSupport = ({ addVariant }) => {
	addVariant("child", "& > *");
	addVariant("child-hover", "& > *:hover");
};

const extendedTailwind = plugin(function ({ addComponents, theme }) {
	addComponents({
		".axis-center": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	});
});

module.exports = {
	darkMode: ["class", '[data-theme="dark"]'],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,md,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,md,mdx}",
		"./src/layouts/**/*.{js,ts,jsx,tsx,md,mdx}",
	],
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: {
						"blockquote p:first-of-type::before": {
							content: "none",
						},
						"blockquote p:first-of-type::after": {
							content: "none",
						},
						"code::before": { content: "none" },
						"code::after": { content: "none" },
						// code: {
						// 	fontWeight: theme("fontWeight.normal"),
						// 	backgroundColor: theme("colors.violet.100"),
						// 	paddingBlock: theme("spacing")[1],
						// 	paddingInline: theme("spacing")[1.5],
						// 	borderRadius: theme("borderRadius.DEFAULT"),
						// },
					},
				},
			}),
			keyframes: {
				"fade-in": {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
				wiggle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				rotate90: {
					"0%": { transform: "rotate(0deg)" },
					"100%": {
						transform: "rotate(90deg)",
						transition: "all 0.5s ease-in-out",
						// "-webkit-animation-fill-mode": "forwards",
						// set new position to animated
					},
				},
				rotate180: {
					"0%": {
						transform: "rotate(0deg)",
					},
					"100%": { transform: "rotate(180deg)" },
				},
				rotate360: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.5s ease-in-out",
				wiggle: "wiggle 1s ease-in-out infinite",
				rotate90: "rotate90 1s ease-in-out",
				rotate180: "rotate180 1s ease-in-out",
				rotate360: "rotate360 1s ease-in-out",
			},
		},
		screen: {
			sm: 425,
			md: 768,
			lg: 1024,
			xl: 1280,
			"2xl": 1440,
		},
		fontFamily: {
			satoshi: "Satoshi sans-serif",
		},
	},

	daisyui: {
		styled: true,
		themes: [
			{
				light: {
					...require("daisyui/src/colors/themes")[
						"[data-theme=light]"
					],
				},
			},
		],

		base: true,
		utils: true,
		logs: true,
		rtl: false,

		prefix: "",
	},

	plugins: [extendedTailwind, daisy, childrenSupport],
};
