<script lang="ts">
	import AuthPicture from '$lib/wadoud/auth_picture.avif?enhanced';
	import type { PageData } from './$types';
	export let data: PageData;
	import RegisterForm from './RegisterForm.svelte';
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>
<div class="LoginPage flex flex-row py-10 items-center justify-center h-full min-h-full min-w-96s">
	<div class="sm:flex-1 hidden lg:flex min-h-full h-full">
		<enhanced:img
			alt="auth"
			src={AuthPicture}
			class="w-full h-full min-h-full dark:opacity-70"
			loading="lazy"
		/>
	</div>
	<div
		class="flex flex-col items-center justify-center gap-5 w-full max-w-fit lg:flex-1 px-5 sm:max-w-full"
	>
		<RegisterForm data={data.form} />
	</div>
</div>

<style>
	* {
		@apply transition-all duration-100;
	}

	/* input {
		@apply border  border-black/60 p-2 outline-none focus:border-2  text-black w-full;
	} */
</style>
