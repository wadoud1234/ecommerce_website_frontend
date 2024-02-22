<script lang="ts">
	import { SunOutline, MoonOutline } from 'flowbite-svelte-icons';
	import { toggleTheme } from '$lib/theme';
	import Theme from '$lib/theme';
	$: console.log(Theme);
</script>

<button
	class="hover:text-gray-500 flex items-center border border-gray-700 hover:border-gray-500 rounded-md cursor-pointer p-2"
	on:click={() => toggleTheme()}
>
	{#if Theme === 'dark'}
		<MoonOutline size="lg" />
	{:else}
		<SunOutline size="lg" />
	{/if}</button
>
