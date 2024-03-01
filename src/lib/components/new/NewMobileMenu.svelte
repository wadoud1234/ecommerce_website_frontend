<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import MobileMenuItem from '$lib/components/new/MobileMenuItem.svelte';
	import type { User } from 'lucia';
	export let user: User;
	let hidden = false;
</script>

<button
	type="button"
	on:click={() => {
		hidden = !hidden;
	}}
	class="block md:hidden rounded-sm border-0 bg-gray-200 dark:bg-inherit dark:text-inherit dark:border-1 dark:border-zinc-800 p-2"
>
	<Menu />
</button>
<div
	class={`z-20 flex-col items-center transition-all duration-300 ${hidden ? 'flex md:hidden' : 'hidden'} absolute top-[71px] right-0 left-0 bg-white dark:bg-zinc-800`}
>
	<MobileMenuItem text="Home" link="/" />
	<MobileMenuItem text="About" link="/about" />
	<MobileMenuItem text="Contact" link="/contact" />
	{#if user && user.id}
		<MobileMenuItem text="Profile" link="/profile" />
		<MobileMenuItem text="Logout" link="/auth/logout" />
	{:else}
		<MobileMenuItem text="Login" link="/auth/login" />
	{/if}
</div>
