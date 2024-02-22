<script>
	import { colorMode } from '$lib/colorMode';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
</script>

<div
	class={`${$colorMode === 'dark' ? 'bg-gray-950' : 'bg-gray-200'} flex flex-col min-h-screen justify-between`}
>
	<Navbar loggedIn={false} />
	<slot />
	<Footer />
</div>
