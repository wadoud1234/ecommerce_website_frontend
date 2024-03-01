<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon as IconType } from 'lucide-svelte';
	import { page } from '$app/stores';
	export let name: string;
	export let Icon: ComponentType<IconType>;
	let pathname: string;
	let queries: URLSearchParams;
	$: {
		pathname = $page.url.pathname;
		queries = $page.url.searchParams;
	}
	let link: string;
	let active: boolean;

	$: {
		link = pathname + `?category=${name.toLowerCase()}`;
		active = queries?.get('category') === name.toLowerCase();
	}
</script>

<a
	href={link}
	data-sveltekit-noscroll
	class={`CategoryCard w-40 h-36 rounded-sm border border-gray-400 flex-1 flex flex-col gap-4 items-center justify-center ${active ? 'bg-red-600 bg-opacity-80 text-white' : ''}`}
>
	<!-- <img
		src={active ? details.picture[0] : details.picture[1]}
		alt="category"
		class={`w-12 h-12 object-cover ${active ? 'fill-white text-white stroke-white' : ' fill-black stroke-black text-black'}`}
	/> -->
	<svelte:component this={Icon} size={36} />
	<p class="poppins-medium">{name}</p>
</a>
