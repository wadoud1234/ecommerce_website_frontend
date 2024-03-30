<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon as IconType } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { generateSlug } from '$lib/helpers/strings';
	import Button from '../ui/button/button.svelte';
	import { twMerge } from 'tailwind-merge';
	import { goto } from '$app/navigation';
	export let name: string;
	export let Icon: ComponentType<IconType>;
	let pathname: string;
	let queries: URLSearchParams;

	export let active: boolean;
	export let onClick: () => void;
	$: {
		pathname = $page.url.pathname;
		queries = $page.url.searchParams;
	}
	const handleNavigation = () => {
		const url = new URL($page.url);
		url.searchParams.set('category', generateSlug(name));
		goto(url.toString(), { invalidateAll: true, noScroll: true });
	};
</script>

<Button
	aria-label={`category ${name}`}
	on:click={() => {
		onClick();
		handleNavigation();
	}}
	data-sveltekit-noscroll
	class={twMerge(
		'bg-inherit hover:bg-zinc-100  dark:hover:bg-zinc-700 text-inherit CategoryCard w-40 h-36 rounded-sm border border-zinc-300 dark:border-zinc-600 flex-1 flex flex-col gap-4 items-center justify-center',
		active && 'bg-red-600 hover:bg-red-500 bg-opacity-80 text-white'
	)}
>
	<svelte:component this={Icon} size={36} />
	<p class="poppins-medium">{name}</p>
</Button>
