<script lang="ts">
	import NewFooter from '$lib/components/new/NewFooter.svelte';
	import NewNavbar from '$lib/components/new/NewNavbar.svelte';
	import './../../app.css';
	let announcement: { title: string; link: string } = { title: '', link: '' };
	import type { LayoutServerData } from './$types';
	import type { User } from 'lucia';
	export let data: LayoutServerData;
	let user: User | null;
	$: user = data.user;
</script>

<div class="min-h-screen h-full flex flex-col justify-between overflow-x-hidden">
	<NewNavbar {announcement} {user} />
	<slot />
	<NewFooter />
</div>
