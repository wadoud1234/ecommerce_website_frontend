<script>
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import StarRating from '$lib/components/StarRating.svelte';
	import Theme from '$lib/theme';
	import './../app.css';
</script>

<div
	class={`dark:bg-gray-950 bg-gray-200 flex flex-col min-h-screen justify-between items-center`}
	data-theme={Theme}
>
	<Navbar loggedIn={false} />
	<slot />
	<Footer />
</div>
