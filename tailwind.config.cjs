/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html',
		'./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {}
	},
	important: '#root',
	corePlugins: {
		// Remove the Tailwind CSS preflight styles so it can use Material UI's preflight instead (CssBaseline).
		preflight: false,
	},
	plugins: []
};
