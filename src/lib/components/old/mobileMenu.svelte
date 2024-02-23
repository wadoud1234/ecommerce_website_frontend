<script lang="ts">
	import { MenuIcon } from '$lib/icons';

	let showMenu = false;
</script>

<div class="lg:hidden">
	<img
		src="/menu.svg"
		width="40"
		height="40"
		alt="menu"
		class="cursor-pointer dark:text-gray-200"
		color="red"
	/>
	<div
		class={`${showMenu ? 'flex' : 'hidden'} min-w-full text-lg flex-col  bg-green-300 absolute top-[68px] right-0`}
	>
		<button class="py-2 hover:bg-green-400 border border-y-gray-400 border-x-none">Toggle</button>
		<button class="py-2 hover:bg-green-400 border border-b-gray-400 border-x-none"
			>Categories</button
		>
		<button class="py-2 hover:bg-green-400 border border-b-gray-400 border-x-none">Register</button>
		<!-- <button class="py-2 hover:bg-green-400 border border-b-gray-400 border-x-none">Login</button> -->
		<button class="py-2 hover:bg-green-400 border border-b-gray-400 border-x-none">Profile</button>
	</div>
</div>
