<script lang="ts">
	import AuthPicture from '$lib/wadoud/auth_picture.avif?enhanced';
	import LoginForm from '$lib/components/new/LoginForm.svelte';
	import type { PageData } from './$types';
	import IconButton from '$lib/components/new/IconButton.svelte';
	import { GithubLogo } from '$lib/icons';
	export let data: PageData;
	$: {
		console.log({ data });
	}
</script>

<svelte:head>
	<title>SHOP | Login</title>
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
		<!-- <form action="" class="flex flex-col items-center justify-center gap-5 w-full max-w-[340px]">
			<div
				class="flex flex-col gap-5 justify-center items-center lg:justify-start lg:items-start min-w-full"
			>
				<h2 class="text-5xl font-medium">Login</h2>
				<p>Enter your details below</p>
			</div>
			<div class="flex flex-col gap-5 w-full mb-3">
				<div class=" bg-green-600 w-full">
					<label for="email" hidden>Email</label>
					<input
						type="email"
						bind:value={Data.email}
						autocomplete=""
						name="email"
						id="email"
						placeholder="Email"
						min="10"
					/>
				</div>
				<div class="">
					<label for="password" hidden>Password</label>
					<input
						type="password"
						bind:value={Data.password}
						name="password"
						id="password"
						placeholder="Password"
						autocomplete=""
						min={10}
					/>
				</div>
			</div>
			<div class="flex flex-row justify-between gap-4 min-w-full w-full">
				<IconButton
					type="submit"
					text="Login"
					className="px-6 py-[10px] max-h-12 rounded-sm  bg-red-600 hover:bg-red-600/75 bg-opacity-85 text-white"
				/>

				<IconButton
					link="/auth/forget_password"
					text="Forget Password"
					className="dark:text-red-400/90 text-red-600 border-none hover:border border-red-600 rounded-md font-medium"
				/>
			</div>
			<IconButton
				type="submit"
				text="Login with Github"
				link="/auth/login/github"
				className="w-full border border-black/30 bg-zinc-100/50 hover:bg-zinc-200/50 dark:bg-zinc-800 dark:hover:bg-zinc-900 p-1.5 rounded-sm gap-4 max-h-12"
			>
				<enhanced:img alt="google" src={GithubLogo} class="w-8" loading="lazy" />
			</IconButton>
		</form> -->

		<LoginForm data={data?.form} />
		<IconButton
			text="Login with Github"
			link="/auth/login/github"
			className="w-full border border-black/30 bg-zinc-100/50 hover:bg-zinc-200/50 dark:bg-zinc-800 dark:hover:bg-zinc-900 p-1.5 rounded-sm gap-4 max-h-12 max-w-[340px]"
		>
			<enhanced:img alt="google" src={GithubLogo} class="w-8" loading="lazy" />
		</IconButton>
		<p class="flex gap-3">
			Don't have Account yet ?
			<a href="/auth/register" class="underline underline-offset-2 underline-black">Register</a>
		</p>
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
