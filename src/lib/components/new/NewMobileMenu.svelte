<script lang="ts">
	import { Menu } from 'lucide-svelte';
	import MobileMenuItem from '$lib/components/new/MobileMenuItem.svelte';
	export let registered: boolean;
	let hidden = false;
</script>

<button
	type="button"
	on:click={() => {
		hidden = !hidden;
	}}
	class="block md:hidden rounded-sm border-none bg-gray-200 p-2"
>
	<Menu />
</button>
<div
	class={`z-20 flex-col items-center transition-all duration-300 ${hidden ? 'flex md:hidden' : 'hidden'} absolute top-[71px] right-0 left-0 bg-white`}
>
	<MobileMenuItem text="Home" link="/home" />
	<MobileMenuItem text="About" link="/about" />
	<MobileMenuItem text="Contact" link="/contact" />
	{#if registered}
		<MobileMenuItem text="Profile" link="/profile" />
		<MobileMenuItem text="Logout" link="/auth/logout" />
	{:else}
		<MobileMenuItem text="Login" link="/auth/login" />
	{/if}
</div>
