<script lang="ts">
	import LoginForm from './LoginForm.svelte';
	import type { PageServerData } from './$types';
	export let data: PageServerData;
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login to your account" />
</svelte:head>
<!-- <div
	class="flex flex-row items-center justify-center h-full min-h-full gap-10 py-10 LoginPage min-w-96s"
>
	<div class="hidden h-full min-h-full sm:flex-1 lg:flex">
		<img
			src={AuthPicture || ''}
			alt="auth"
			class="w-full h-full min-h-full dark:opacity-50"
			loading="lazy"
		/>
	</div>
	<div class="flex flex-col items-start justify-center w-full max-w-full gap-5 lg:flex-1"> -->
<LoginForm data={data.form} />

<!-- </div>
</div> -->


