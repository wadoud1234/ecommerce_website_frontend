<script lang="ts">
	import NewFooter from '$lib/components/new/NewFooter.svelte';
	import NewNavbar from '$lib/components/new/NewNavbar.svelte';
	import AuthStore from '$lib/stores/AuthStore';
	import { get } from 'svelte/store';
	import './../../app.css';
	let announcement: { title: string; link: string } = { title: '', link: '' };
	import type { LayoutServerData } from './$types';
	import type { User } from 'lucia';
	export let data: LayoutServerData;
	// ts-ignore
	let user = data?.user;
</script>

<div class="min-h-screen flex flex-col justify-between h-full overflow-x-hidden">
	<NewNavbar {announcement} {user} />
	<slot />
	<NewFooter />
</div>
