<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import type { PageData } from './$types';
	import { AuthPicture } from '$lib/icons';
	export let data: PageData;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>
<div
	class="flex flex-row items-center justify-center h-full min-h-full gap-10 py-10 LoginPage min-w-96s"
>
	<div class="hidden h-full min-h-full sm:flex-1 lg:flex">
		<enhanced:img
			src={AuthPicture}
			alt="auth"
			class="w-full h-full min-h-full dark:opacity-50"
			loading="lazy"
		/>
	</div>
	<div class="flex flex-col items-center justify-center w-full max-w-full gap-5 lg:flex-1">
		<LoginForm data={data?.form} />
	</div>
</div>

<style>
	* {
		@apply transition-all duration-100;
	}
</style>
