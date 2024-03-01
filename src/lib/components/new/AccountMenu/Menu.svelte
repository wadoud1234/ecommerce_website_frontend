<script lang="ts">
	import type { User } from 'lucia';
	import Item from './Item.svelte';
	import Separator from './Separator.svelte';
	import { History, LogOut, Settings, ShoppingCart, UserRound } from 'lucide-svelte';
	export let user: User;
	let showMenu: boolean = false;
	const toggle = () => {
		showMenu = !showMenu;
	};
</script>

<div class="relative">
	<button on:click={() => toggle()}>
		<img
			src={user?.avatar}
			alt={user?.name.slice(0, 2).toUpperCase()}
			class="rounded-full mt-1 bg-green-700"
			width="30"
		/>
	</button>
	<div
		class={`text-inherit AccountMenu rounded-lg pt-1 w-fit border-black/40 border-[0.5px] bg-white dark:bg-zinc-900 z-100 shadow-black/10 dark:shadow-white/10 shadow-md absolute top-[52px] -right-2 ${showMenu ? 'block' : 'hidden'}`}
	>
		<!-- <div class="py-1 border border-b-black/20 border-t-0 border-x-0 pl-4">Hello</div> -->
		<h3 class=" pl-4 mb-1 underline-offset-2 underline text-lg">Account</h3>
		<!-- <Separator /> -->
		<Item link="/account" title="Profile" Icon={UserRound} size={22} />
		<Item link="/cart" title="Cart" size={22} Icon={ShoppingCart} />
		<Item link="/account/orders" title="Orders" size={22} Icon={History} />
		<Item link="/account/settings" title="Settings" size={22} Icon={Settings} />
		<form action="/auth/logout" method="POST" class="dark:hover:bg-white/5 hover:bg-black/5">
			<button type="submit" class="flex flex-row gap-4 pl-4 pr-16 py-1.5 border-b-lg"
				><LogOut /> Logout</button
			>
		</form>
	</div>
</div>

<!-- <style>
	* {
		@apply transition-all duration-700;
	}
</style> -->
