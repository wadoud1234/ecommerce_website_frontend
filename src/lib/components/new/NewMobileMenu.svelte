<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import MobileMenuItem from '$lib/components/new/MobileMenuItem.svelte';
	import type { User } from 'lucia';
	import LogoutForm from './LogoutForm.svelte';
	export let user: User | null;
	let hidden = false;

	let toggle = () => {
		hidden = !hidden;
	};
</script>

<button
	aria-label="Menu"
	type="button"
	on:click={toggle}
	class="p-2 bg-gray-200 border-0 rounded-sm  dark:bg-inherit dark:text-inherit dark:border-1 dark:border-zinc-800"
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
		<MobileMenuItem text="Profile" link="/account/profile" />
		<LogoutForm
			hasIcon={false}
			buttonClasses="w-full items-center justify-center py-2 poppins-regular text-lg hover:text-black/80 dark:border-b-zinc-900 border-t-0 border-x-0 border border-b-gray-300"
			formClasses="w-full"
		/>
	{:else}
		<MobileMenuItem text="Login" link="/auth/login" />
	{/if}
</div>
