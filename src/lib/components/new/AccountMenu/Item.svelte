<script lang="ts">
	export let title: string;
	import { SvelteComponent, type ComponentType } from 'svelte';
	import type { Icon as IconType } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	export let Icon: ComponentType<IconType>;
	export let size = 24;
	export let link: string;
	export let onClick:()=>void=()=>{}
</script>

<Button
	on:click={onClick}
	href={link}
	data-sveltekit-preload-data="hover"
	class="hover:bg-black/5 bg-inherit text-inherit text-lg font-medium dark:hover:bg-white/5 w-full flex flex-row items-center justify-start gap-4 pl-4 pr-20 py-2"
>
	<svelte:component this={Icon} {size} />
	<span class="">{title}</span>
</Button>
