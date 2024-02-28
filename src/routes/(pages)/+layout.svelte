<script lang="ts">
	import { dev } from '$app/environment';
	import NewFooter from '$lib/components/new/NewFooter.svelte';
	import NewNavbar from '$lib/components/new/NewNavbar.svelte';
	import './../../app.css';
	let announcement: { title: string; link: string } = { title: '', link: '' };
</script>

<div
	class="min-h-screen flex flex-col justify-between h-full dark:bg-white bg-white overflow-x-hidden"
>
	<NewNavbar {announcement} />
	<slot />
	<NewFooter />
</div>

<style>
	* {
		@apply font-sans text-black;
	}
</style>
