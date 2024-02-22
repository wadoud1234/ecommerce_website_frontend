<script lang="ts">
	export let name: string;
	export let price: number;
	export let likes: number;
	export let picture: string;
	export let id: number;
	export let rating: number;
	export let discount: number;
	export let sold: number;
	import { HeartOutline } from 'flowbite-svelte-icons';
	import StarRating from '../StarRating.svelte';
	const formatProductName = (name: string) => {
		const value = name.slice(0, 20);
		return value;
	};
	const formatSold = (sold: number) => {
		if (sold < 1000) {
			return sold;
		} else if (sold < 1000000 && sold > 1000) {
			return (sold / 1000).toFixed(1) + 'K';
		} else if (sold < 1000000000 && sold > 1000000) {
			return (sold / 1000).toFixed(1) + 'M';
		} else {
			return (sold / 1000000).toFixed(1) + 'G';
		}
	};
</script>

<a
	href={`/products/${id}`}
	class="flex flex-col rounded-xl relative border-[0.25px] border-gray-300 dark:border-gray-600 shadow-sm"
>
	<img src={picture} alt="" class="rounded-t-xl h-48 hover:opacity-80" />
	<div class="flex flex-col py-2 px-2 bg-gray-200 dark:bg-gray-700 rounded-b-xl">
		<p class="font-semibold text-lg font-sans">
			<span class={'' + discount && 'line-through'}>{price} $</span>
			{discount && '| ' + discount + '$'}
		</p>
		<div class="flex items-center justify-start gap-1">
			<StarRating readonly={true} dynamic={false} {rating} />
			<p class="text-sm text-zinc-500">{formatSold(1000000)} sold</p>
		</div>
		<p class="text-base font-normal">{formatProductName(name)}</p>
	</div>
	<div class="absolute top-2 right-2">
		<HeartOutline
			size="xl"
			class=" relative bg-gray-200 dark:bg-gray-900 dark:text-white/80 p-[6px] cursor-pointer rounded-full hover:opacity-80"
		/>
		<span
			class="rounded-full p-[2px] text-[12px] absolute -top-2 right-5 bg-red-400 text-white dark:text-white/80"
		>
			{likes}
		</span>
	</div>
</a>

<style>
	* {
		@apply transition-all duration-300;
	}
	p {
		@apply hover:text-stone-600 dark:hover:text-stone-300 transition-all duration-[300ms];
	}
</style>
