<script lang="ts">
	import type { User } from 'lucia';
	import Item from './Item.svelte';
	import { History, Settings, ShoppingCart, UserRound } from 'lucide-svelte';
	import LogoutForm from '../LogoutForm.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { CldImage } from 'svelte-cloudinary';
	export let user: User | null;
	let showMenu: boolean = false;
	function toggle() {
		showMenu = !showMenu;
	}
	let slug: string;
	$: slug = user?.name ? user.name.slice(0, 2).toUpperCase() : '';
</script>

<div class="relative">
	<!-- <Avatar/> -->
	{#if user && user.name}
		{#if user?.avatar && user.avatar.length > 0}
			<button on:click={() => toggle()}>
				<CldImage src={user?.avatar} alt={slug} class="max-w-[40px] max-h-[40px]flex items-center justfify-center rounded-full mt-1.5" />
			</button>
		{:else}
			<!-- <button on:click={()=>toggle()}>
				<p
					role="img"
					class="w-[32px] h-[32px] rounded-full bg-zinc-600 text-center flex justify-center items-center text-lg"
				>
					{slug}
				</p>
			</button> -->
			<button on:click={() => toggle()}>
				<Avatar.Root>
					<Avatar.Fallback class="cursor-pointer">{slug}</Avatar.Fallback>
				</Avatar.Root>
			</button>
		{/if}
	{:else}
		<a href="/auth/login"> <UserRound size="22" /> </a>
	{/if}
	{#if user && user.name}
		<div
			class={`text-inherit AccountMenu rounded-lg w-fit border-black/40 border-[0.5px] bg-white dark:bg-zinc-900 z-100 shadow-black/10 dark:shadow-white/10 shadow-md absolute top-[64px] -right-2 ${showMenu ? 'flex flex-col' : 'hidden'}`}
		>
			<h3 class="py-2 pl-4 underline-offset-4 underline text-lg font-medium">
				{user.name.split(' ')[0]}
			</h3>
			<Item link="/profile" title="Profile" Icon={UserRound} size={22} />
			<Item link="/cart" title="Cart" size={22} Icon={ShoppingCart} />
			<Item link="/account/orders" title="Orders" size={22} Icon={History} />
			<Item link="/account/settings" title="Settings" size={22} Icon={Settings} />
			<LogoutForm
				formClasses="dark:hover:bg-white/5 hover:bg-black/5"
				buttonClasses="flex flex-row gap-4 pl-4 text-lg poppins-medium pr-20 py-2 border-b-md"
			/>
		</div>
	{/if}
</div>
