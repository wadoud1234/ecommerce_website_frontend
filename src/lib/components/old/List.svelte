<script>
	import DarkModeToggle from './DarkModeToggle.svelte';
	export let loggedIn = false;
</script>

<div class="hidden lg:flex text-base gap-2 lg:gap-4 font-semibold items--center justify-end">
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
		<!-- <button
			class="py-2 border border-gray-700 transition-all transition-300 hover:border-gray-700/90 hover:text-black/70 font-semibold px-4 rounded-md"
			>Login</button
		> -->
	{/if}
	<DarkModeToggle />
</div>
