<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon as IconType } from 'lucide-svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import NewCategoryCard from './NewCategoryCard.svelte';
	export let categories: { name: string; Icon: ComponentType<IconType> }[];
	let active: number | null = null;
</script>

<Carousel.Root id="carousel" opts={{ align: 'start' }} orientation="horizontal">
	<Carousel.Content class="transition-none duration-0">
		{#each categories as { name, Icon }, i}
			<Carousel.Item
				class="flex flex-nowrap basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/5 2xl:basis-1/6"
			>
				<NewCategoryCard
					onClick={() => {
						active = i;
					}}
					{name}
					{Icon}
					active={active === i}
				/>
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="bg-black text-white" />
	<Carousel.Next class="bg-black text-white" />
</Carousel.Root>
