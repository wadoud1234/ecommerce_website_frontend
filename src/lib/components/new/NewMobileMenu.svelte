<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import MobileMenuItem from '$lib/components/new/MobileMenuItem.svelte';
	import type { User } from 'lucia';
	import LogoutForm from './LogoutForm.svelte';
	export let user: User;
	let hidden = false;

	let toggle = () => {
		hidden = !hidden;
	};
</script>

<button
	type="button"
	on:click={toggle}
	class="block md:hidden rounded-sm border-0 bg-gray-200 dark:bg-inherit dark:text-inherit dark:border-1 dark:border-zinc-800 p-2"
>
	<Menu />
</button>
<div
	class={`z-20 flex-col items-center transition-all duration-300 ${hidden ? 'flex md:hidden' : 'hidden'} absolute top-[71px] right-0 left-0 bg-white dark:bg-zinc-950`}
>
	<MobileMenuItem text="Home" link="/" />
	<MobileMenuItem text="About" link="/about" />
	<MobileMenuItem text="Contact" link="/contact" />
	{#if user && user.id}
		<MobileMenuItem text="Profile" link="/profile" />
		<LogoutForm
			hasIcon={false}
			buttonClasses="w-full items-center justify-center py-2 poppins-regular text-lg hover:text-black/80 dark:border-b-zinc-900 border-t-0 border-x-0 border border-b-gray-300"
			formClasses="w-full"
		/>
	{:else}
		<MobileMenuItem text="Login" link="/auth/login" />
	{/if}
</div>
