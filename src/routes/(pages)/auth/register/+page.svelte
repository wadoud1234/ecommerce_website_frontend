<script lang="ts">
	import IconButton from '$lib/components/new/IconButton.svelte';
	import { GoogleLogo } from '$lib/icons';
	import AuthPicture from '$lib/wadoud/auth_picture.avif?enhanced';
	import type { PageData } from './$types';
	export let data: PageData;
	import RegisterForm from './RegisterForm.svelte';
</script>

<svelte:head>
	<title>SHOP | Register</title>
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
		<!-- <form
			action=""
			class="flex flex-col items-center justify-center lg:items-start lg:justify-start gap-5 w-full max-w-[340px]"
		>
			<div
				class="flex flex-col gap-5 items-center justify-center lg:items-start lg:justify-start w-full"
			>
				<h2 class="text-5xl font-medium">Register</h2>
				<p>Enter your details below</p>
			</div>
			<div class="flex flex-col gap-5 w-full mb-3">
				<div class="">
					<label for="name" hidden>Name</label>
					<input
						type="text"
						bind:value={Data.name}
						autocomplete=""
						name="name"
						id="name"
						placeholder="Name"
						min="10"
					/>
				</div>
				<div class="">
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
				<div class="">
					<label for="confirm_password" hidden>Confirm Password</label>
					<input
						bind:value={Data.confirm_password}
						type="password"
						name="confirm_password"
						id="confirm_password"
						placeholder="Confirm Password"
						autocomplete={''}
						min={10}
					/>
				</div>
			</div>
			<div class="flex flex-col items-center justify-center gap-4 w-full">
				<IconButton
					type="submit"
					text="Create Account"
					className="w-full py-[12px] max-h-12 rounded-sm  bg-red-600 hover:bg-red-600/75 bg-opacity-85 text-white"
				/>
			</div>
		</form> -->
		<RegisterForm data={data.form} />
		<IconButton
			type="submit"
			text="Login with Github"
			link="/auth/login/github"
			className="w-full border border-black/30 bg-zinc-100/50 hover:bg-zinc-200/50 dark:bg-zinc-800 dark:hover:bg-zinc-900 p-1.5 rounded-sm gap-4 max-h-12"
		>
			<enhanced:img alt="google" src={GoogleLogo} class="w-8" loading="lazy" />
		</IconButton>
		<p class="flex gap-3">
			Already Have Account ?
			<a href="/auth/login" class="underline underline-offset-2 underline-black">Login</a>
		</p>
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
