<script lang="ts">
	import { dev } from '$app/environment';
	import './../app.css';
	import { inject } from '@vercel/analytics';
	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />
