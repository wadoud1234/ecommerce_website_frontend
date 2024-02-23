<script lang="ts">
	export let loggedIn: boolean;
	import { SearchOutline } from 'flowbite-svelte-icons';
	import DarkModeToggle from './DarkModeToggle.svelte';
	import MobileMenu from './mobileMenu.svelte';
	import SearchBar from './SearchBar.svelte';
	import List from './List.svelte';
	import Logo from './Logo.svelte';
	import Container from './Container.svelte';
</script>

<nav
	class={`flex items-center px-10 lg:px-20 h-16  dark:bg-gray-950 bg-white shadow shadow-gray w-full justify-center`}
>
	<Container>
		<div class="min-w-full flex items-center justify-between gap-2 lg:gap-4">
			<!-- Logo -->
			<Logo />
			<button class="border-none rounded-lg bg-blue-700 text-white poppins-bold py-2 px-4"
				><a href="/home">Home</a></button
			>
			<!-- Search -->
			<SearchBar />

			<!-- Icons + Humburger Menu -->
			<List {loggedIn} />
			<MobileMenu />
		</div>
	</Container>
</nav>
