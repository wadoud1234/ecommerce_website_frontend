<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon as IconType } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { generateSlug } from '$lib/helpers/strings';
	import Button from '../ui/button/button.svelte';
	import { twMerge } from 'tailwind-merge';
	export let name: string;
	export let Icon: ComponentType<IconType>;
	let pathname: string;
	let queries: URLSearchParams;
	
	let link: string;
	export let active: boolean;
	export let onClick : ()=>void
	$: {
		pathname = $page.url.pathname;
		queries = $page.url.searchParams;
		link = pathname + `?category=${generateSlug(name)}`;
	}
</script>

<Button
	href={link}
	on:click={onClick}
	data-sveltekit-noscroll
	class={twMerge('bg-inherit hover:bg-inherit text-inherit CategoryCard w-40 h-36 rounded-sm border border-zinc-400 dark:border-zinc-600 flex-1 flex flex-col gap-4 items-center justify-center',active && 'bg-red-600 bg-opacity-80 text-white')}
>
	<svelte:component this={Icon} size={36} />
	<p class="poppins-medium">{name}</p>
</Button>
