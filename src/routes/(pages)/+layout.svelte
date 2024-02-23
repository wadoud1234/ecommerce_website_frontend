<script lang="ts">
	import NewFooter from '$lib/components/new/NewFooter.svelte';
	import NewNavbar from '$lib/components/new/NewNavbar.svelte';
	import './../../app.css';
	let announcement: { title: string; link: string } = { title: '', link: '' };
</script>

<div class="pb-10 dark:bg-white bg-white">
	<NewNavbar {announcement} />
	<hr class="w-full border-gray-300" />
	<slot />
	<NewFooter />
</div>

<style>
	* {
		@apply font-sans text-black;
	}
</style>
