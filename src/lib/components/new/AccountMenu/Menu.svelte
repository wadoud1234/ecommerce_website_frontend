<script lang="ts">
	import type { User } from 'lucia';
	import Item from './Item.svelte';
	import { BadgePlus, History, LogIn, Settings, ShoppingCart, UserRound } from 'lucide-svelte';
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

<div class="relative flex flex-row items-center h-full">
	<!-- <Avatar/> -->
	{#if user && user.name}
		{#if user?.avatar && user.avatar.length > 0}
			<button on:click={()=>toggle()} class="w-10 h-10 max-w-10 max-h-10">
				<CldImage src={user?.avatar} alt={slug} class="max-w-[40px] max-h-[40px]flex items-center justfify-center rounded-full" />
			</button>
		{:else}
			<button on:click={()=>toggle()}>
				<Avatar.Root>
					<Avatar.Fallback class="cursor-pointer">{slug}</Avatar.Fallback>
				</Avatar.Root>
			</button>
		{/if}
	{:else}
		<button on:click={()=>toggle()} class="h-full">
			<UserRound size={22} />
		</button>
	{/if}
	
	<div
		class={`text-inherit AccountMenu rounded-lg w-fit border-black/40 border-[0.5px] bg-white dark:bg-zinc-900 z-50 shadow-black/10 dark:shadow-white/10 shadow-md absolute top-[52px] -right-2 ${showMenu ? 'flex flex-col' : 'hidden'}`}
	>
		{#if user && user.name}
			<h3 class="py-2 pl-4 text-lg font-medium underline underline-offset-4">
				{user.name.split(' ')[0]}
			</h3>
			<Item 
				link="/profile" 
				title="Profile" 
				Icon={UserRound} 
				size={22} 
				onClick={toggle}
			/>
			<Item 
				link="/profile/add-product" 
				title="Add Product" 
				size={22} 
				Icon={BadgePlus}  
				onClick={toggle}
			/>
			<Item 
				link="/cart" 
				title="Cart" 
				size={22} 
				Icon={ShoppingCart}  
				onClick={toggle}
			/>
			<Item 
				link="/account/orders" 
				title="Orders" 
				size={22} 
				Icon={History}  
				onClick={toggle}
			/>
			<Item 
				link="/account/settings" 
				title="Settings" 
				size={22} 
				Icon={Settings}  onClick={toggle}
			/>
			<LogoutForm
				formClasses="dark:hover:bg-white/5 hover:bg-black/5"
				buttonClasses="flex flex-row gap-4 pl-4 text-lg poppins-medium pr-20 py-2 border-b-md"
			/>
		{:else}
			<h3 class="py-2 pl-4 text-lg font-medium underline underline-offset-4">
					No Account
			</h3>
			<Item 
				link="/auth/login" 
				title="Login" 
				Icon={LogIn} 
				size={22} 
				onClick={toggle}
			/>
			<Item 
				link="/auth/register" 
				title="Register" 
				size={22} 
				Icon={BadgePlus}  
				onClick={toggle}
			/>
		{/if}
	</div>
</div>
