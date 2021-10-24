import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	extensions: ['.svelte'],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		ssr: false,
		vite: {
			server: {
				proxy: {
					'/graphql': 'http://localhost:7000'
				}
			}
		}
	}
};

export default config;
