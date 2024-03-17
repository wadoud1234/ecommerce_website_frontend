<script lang="ts">
	import { AuthPicture } from '$lib/icons';
	import type { PageData } from './$types';
	export let data: PageData;
	import RegisterForm from './RegisterForm.svelte';
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>
<div class="flex flex-row items-center justify-center h-full min-h-full py-10 RegisterPage min-w-96s">
	<div class="hidden h-full min-h-full sm:flex-1 lg:flex">
		<enhanced:img
			alt="auth"
			src={AuthPicture}
			class="w-full h-full min-h-full dark:opacity-50"
		/>
	</div>
	<div
		class="flex flex-col items-center justify-center w-full gap-5 px-5 max-w-fit lg:flex-1 sm:max-w-full"
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
