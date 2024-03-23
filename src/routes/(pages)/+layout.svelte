<script lang="ts">
	import NewFooter from '$lib/components/new/NewFooter.svelte';
	import NewNavbar from '$lib/components/new/NewNavbar.svelte';
	import './../../app.css';
	let announcement: { title: string; link: string } = { title: '', link: '' };
	import type { LayoutServerData } from './$types';
	export let data: LayoutServerData;
	$: user = data.user;
</script>

<div class="flex flex-col justify-between h-full min-h-screen overflow-x-hidden">
	<NewNavbar {announcement} {user} />
	<slot />
	<NewFooter />
</div>
