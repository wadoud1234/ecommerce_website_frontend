<script lang="ts">
	import { colorMode } from '$lib/colorMode';
	import { SunOutline, MoonOutline } from 'flowbite-svelte-icons';
</script>

<button
	class="hover:text-gray-500 flex items-center border border-gray-700 hover:border-gray-500 rounded-md p-2 cursor-pointer"
	onclick={() => ($colorMode = $colorMode === 'dark' ? 'light' : 'dark')}
>
	{#if $colorMode === 'dark'}
		<MoonOutline size="sm" />
	{:else}
		<SunOutline size="lg" />
	{/if}
</button>
