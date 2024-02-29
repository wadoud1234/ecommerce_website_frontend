<script lang="ts">
	import IconButton from '$lib/components/new/IconButton.svelte';
	import { GoogleLogo } from '$lib/icons';
	import AuthPicture from '$lib/wadoud/auth_picture.avif?enhanced';
	let Data: {
		name: string;
		email: string;
		password: string;
		confirm_password: string;
	} = {
		name: '',
		email: '',
		password: '',
		confirm_password: ''
	};
	$: console.log({ AuthPicture });
</script>

<div
	class="LoginPage flex flex-row py-10 gap-10 items-center justify-center h-full min-h-full min-w-96s"
>
	<div class="sm:flex-1 hidden lg:flex min-h-full h-full">
		<enhanced:img src={AuthPicture} alt="auth" class="w-full h-full min-h-full" loading="lazy" />
	</div>
	<div class="flex flex-col items-center justify-center gap-5 w-full lg:flex-1 max-w-full">
		<form action="" class="flex flex-col items-center justify-center gap-5 w-full max-w-[340px]">
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
					className="text-red-600 border-none hover:border border-red-600 rounded-md font-medium"
				/>
				<!-- <IconButton
					type="submit"
					text="Login with Google"
					className="w-full border border-black/30 hover:bg-black/5 p-1.5 rounded-sm gap-4 max-h-12"
				>
					<enhanced:img src={GoogleLogo} alt="google" class="w-8" />
				</IconButton> -->
			</div>
		</form>
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

	input {
		@apply border  border-black/60 p-2 outline-none focus:border-2 text-black min-w-full;
	}
</style>
