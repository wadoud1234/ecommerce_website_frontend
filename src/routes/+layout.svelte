<script lang="ts">
	import './../app.css';

	import '@fontsource/poppins/100.css';
	import '@fontsource/poppins/200.css';
	import '@fontsource/poppins/300.css';
	import '@fontsource/poppins/400.css';
	import '@fontsource/poppins/500.css';
	import '@fontsource/poppins/600.css';
	import '@fontsource/poppins/700.css';
	import '@fontsource/poppins/800.css';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from "svelte-french-toast"
</script>

<ModeWatcher defaultMode="dark" />

<slot />
<Toaster/>