<script lang="ts">
	import type { ComponentType } from 'svelte';
	import type { Icon as IconType } from 'lucide-svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import NewCategoryCard from './NewCategoryCard.svelte';
	export let categories: { name: string; Icon: ComponentType<IconType> }[];
</script>

<Carousel.Root id="carousel" opts={{ align: 'start' }} orientation="horizontal">
	<Carousel.Content class="transition-none duration-0">
		{#each categories as { name, Icon }}
			<Carousel.Item
				class="flex flex-nowrap basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/5 2xl:basis-1/6"
			>
				<!-- classss flex items-center justify-center xs:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7 -->
				<NewCategoryCard {name} {Icon} />
			</Carousel.Item>
		{/each}
	</Carousel.Content>
	<Carousel.Previous class="bg-black text-white" />
	<Carousel.Next class="bg-black text-white" />
</Carousel.Root>
