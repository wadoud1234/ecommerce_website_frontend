<script lang="ts">
	import { dev } from '$app/environment';
	import './../app.css';

	import '@fontsource/poppins/100.css';
	import '@fontsource/poppins/200.css';
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import { partytownSnippet } from '@builder.io/partytown/integration';
</script>

<svelte:head>
	<script>
		partytown = {
			forward: ['dataLayer.push']
		};
	</script>
	{@html '<script>' + partytownSnippet() + '</script>'}
	<script
		type="text/partytown"
		src="https://www.googletagmanager.com/gtag/js?id=G-ZX7H2KPXNZ"
	></script>
	<script type="text/partytown">
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());
		gtag('config', 'G-ZX7H2KPXNZ');
	</script>
	<script type="text/partytown">
		import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
		injectSpeedInsights();
	</script>
	<script type="text/partytown">
		import { inject } from '@vercel/analytics';
		inject({ mode: dev ? 'development' : 'production' });
	</script>
</svelte:head>
<slot />
