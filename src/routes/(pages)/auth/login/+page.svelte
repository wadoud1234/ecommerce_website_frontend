<script lang="ts">
	import AuthPicture from '$lib/wadoud/auth_picture.avif?enhanced';
	import LoginForm from './LoginForm.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>
<div
	class="LoginPage flex flex-row py-10 gap-10 items-center justify-center h-full min-h-full min-w-96s"
>
	<div class="sm:flex-1 hidden lg:flex min-h-full h-full">
		<enhanced:img
			src={AuthPicture}
			alt="auth"
			class="w-full h-full min-h-full dark:opacity-70"
			loading="lazy"
		/>
	</div>
	<div class="flex flex-col items-center justify-center gap-5 w-full lg:flex-1 max-w-full">
		<LoginForm data={data?.form} />
	</div>
</div>

<style>
	* {
		@apply transition-all duration-100;
	}
	/* 
	input {
		@apply border  border-black/60 p-2 outline-none  text-black min-w-full;
	} */
</style>
