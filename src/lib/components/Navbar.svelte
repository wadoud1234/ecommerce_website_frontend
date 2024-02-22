<script lang="ts">
	import { colorMode } from '$lib/colorMode';
	import Icon from '@iconify/svelte';
	let showMenu = $state(false);
	const { loggedIn } = $props();
	import { SearchOutline } from 'flowbite-svelte-icons';
	import DarkModeToggle from './DarkModeToggle.svelte';
</script>

<nav
	class={`flex items-center px-10 lg:px-20 h-16 ${$colorMode === 'dark' ? 'bg-gray-950' : 'bg-white'} shadow shadow-gray`}
>
	<div class="min-w-full flex items-center justify-between gap-2 lg:gap-4">
		<!-- Logo -->
		<div class="flex gap-2 flex-[0.75] items-center">
			<img
				class="h-8 w-8"
				src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
				alt="Workflow"
			/>
			<p class="text-2xl font-bold text-gray-700 mb-1">Store</p>
		</div>

		<!-- Search -->
		<div>
			<form action="" class="hidden sm:flex flex-1 items-center min-w-full">
				<input
					type="text"
					class="md:w-42 lg:w-80 xl:w-96 bg-gray-300 py-1.5 rounded-l-md pr-2 pl-3 placeholder:text-gray-700"
					placeholder="Search for products ..."
				/>
				<button type="submit" class="rounded-r-md bg-gray-400 py-1.5 px-2 font-semibold">
					<SearchOutline size="lg" />
				</button>
			</form>
		</div>

		<!-- Icons + Humburger Menu -->
		<div class="hidden md:flex items-center text-base gap-2 lg:gap-4 font-semibold">
			<button class="hover:text-gray-700 mr-2">Categories</button>
			{#if loggedIn}
				<!-- Content to render when logged in -->
				<button class="hover:text-green-500">Profile</button>
			{:else}
				<!-- Content to render when not logged in -->
				<button
					class="py-2 bg-gray-700 transition-all transition-300 hover:bg-gray-700/95 px-4 text-gray-100 font-semibold rounded-md"
					>Register</button
				>
				<button
					class="py-2 border border-gray-700 transition-all transition-300 hover:border-gray-700/90 hover:text-black/70 font-semibold px-4 rounded-md"
					>Login</button
				>
			{/if}
			<DarkModeToggle />
		</div>
		<div class="md:hidden">
			<Icon
				icon="icon-park-outline:hamburger-button"
				width="24"
				height="24"
				class="cursor-pointer"
				onclick={() => (showMenu = !showMenu)}
			/>
			<div
				class={`${showMenu ? 'flex' : 'hidden'} min-w-full text-lg flex-col  bg-green-300 absolute top-[68px] right-0`}
			>
				<button class="py-2 hover:bg-green-400 border border-y-gray-400 border-x-none"
					>Toggle</button
				>
				<button class="py-2 hover:bg-green-400 border border-b-gray-400 border-x-none"
					>Categories</button
				>
				<button class="py-2 hover:bg-green-400 border border-b-gray-400 border-x-none"
					>Register</button
				>
				<button class="py-2 hover:bg-green-400 border border-b-gray-400 border-x-none">Login</button
				>
				<button class="py-2 hover:bg-green-400 border border-b-gray-400 border-x-none"
					>Profile</button
				>
			</div>
		</div>
	</div>
</nav>
