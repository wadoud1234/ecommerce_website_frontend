<script lang="ts">
	export let title: string;
	import type { ComponentType } from 'svelte';
	import type { Icon as IconType } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	export let Icon: ComponentType<IconType>;
	export let size = 24;
	export let link: string;
	export let onClick: () => void = () => {};
</script>

<Button aria-label={title}
	on:click={onClick}
	href={link}
	data-sveltekit-preload-data="hover"
	class="flex flex-row items-center justify-start w-full gap-4 py-2 pl-4 pr-20 text-lg font-medium hover:bg-black/5 bg-inherit text-inherit dark:hover:bg-white/5"
>
	<svelte:component this={Icon} {size} />
	<span class="">{title}</span>
</Button>
