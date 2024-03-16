<script lang="ts">
	import NavItem from '$lib/components/new/NavItem.svelte';
	import NewContainer from '$lib/components/new/NewContainer.svelte';
	import Separator from '$lib/components/new/Separator.svelte';
	import { categories } from '$lib/data';
	import HeroSection from '$lib/components/new/HeroSection.svelte';
	import CategoryCarousel from '$lib/components/new/CategoryCarousel.svelte';
	import ProductCarousel from '$lib/components/new/ProductCarousel.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import type { PageData } from './$types';
	import type { Product } from '$lib/types';
	import { page } from '$app/stores';
	export let data:PageData
	let products:Product[]
	let categoryProducts:Product[]|null
	let categoryName:string
	$:{
		products = data.products
		categoryProducts = data.categoryProducts
		categoryName=$page.url.searchParams?.get?.("category")||""
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div class="HomePage w-full min-h-screen h-full">
	<NewContainer>
		<div class="flex flex-col w-full">
			<div class="HeroSection flex flex-row items-start min-h-fit md:h-[450px] w-full lg:h-[380px]">
				<div
					class="NavMenu border border-y-0 border-l-0 border-r-1 border-zinc-300 dark:border-zinc-700 min-w-48 py-4 hidden md:flex flex-col gap-0 h-full"
				>
					<NavItem title="Women's Fashion">
						<button type="button">
							<ChevronRight size="24" />
						</button>
					</NavItem>
					<NavItem title="Men's Fashion">
						<button type="button">
							<ChevronRight size="24" />
						</button>
					</NavItem>
					<NavItem title="Home & Lifestyle" />
					<NavItem title="Electronics" />
					<NavItem title="Medicine" />
					<NavItem title="Sports & Outdoor" />
					<NavItem title="Baby's & Toys" />
					<NavItem title="Groceries & Pets" />
					<NavItem title="Health & Beauty" />
				</div>

				<HeroSection />
			</div>
			<Separator />
			<!-- Search By Category -->
			<div>
				<h3
					class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 dark:text-red-500 font-semibold h-8 mb-4"
				>
					<div class="min-w-4 h-full bg-red-600 dark:bg-red-500 rounded-md text-transparent">
						{'.'}
					</div>
					Categories
				</h3>
				<div class="flex flex-col gap-6">
					<p class="text-2xl poppins-medium">Browse By Categories</p>
					<CategoryCarousel {categories}/>
					{#if data.categoryProducts && data.categoryProducts.length>0}
						<ProductCarousel products={data.categoryProducts} classNames="my-4"/>
					{:else if categoryName && categoryName.length>0}
						<p class="text-xl poppins-medium h-[330px] w-full flex flex-col items-center justify-center">No Products Found For Selected Category</p>
					{/if}
				</div>
			</div>
			
			<Separator />

			<!-- Best Selling Products -->
			<div>
				<h3
					class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 dark:text-red-500 font-semibold h-8 mb-4"
				>
					<div class="min-w-4 h-full bg-red-600 dark:bg-red-500 rounded-md text-transparent">
						{'.'}
					</div>
					This Month
				</h3>
				<div class="flex flex-col gap-6">
					<div class="flex flex-row items-center justify-between">
						<p class="text-2xl poppins-medium">Best Selling Products</p>
						<button
							type="button"
							class="text-white bg-red-600 bg-opacity-80 rounded-sm py-3 px-7 poppins-medium"
							>
								<a class="w-full h-full" href="/products">View All</a>
							</button
						>
					</div>
					{#if products && products?.length>0}
						<ProductCarousel {products} />
					{:else}
						<p class="text-xl poppins-medium h-[100px] w-full flex flex-col items-center justify-center">No Products Found</p>
					{/if}
				</div>
			</div>
			<Separator />
			<div>
				<h3
					class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 dark:text-red-500 font-semibold h-8 mb-4"
				>
					<div class="min-w-4 h-full bg-red-600 dark:bg-red-500 rounded-md text-transparent">
						{'.'}
					</div>
					Our Products
				</h3>
				<div class="flex flex-col gap-6">
					<div class="flex flex-row items-center justify-between">
						<p class="text-2xl poppins-medium">Explore Our Products</p>
					</div>
					{#if products && products?.length>0}
						<ProductCarousel {products} />
					{:else}
						<p class="text-xl poppins-medium h-[100px] w-full flex flex-col items-center justify-center">No Products Found</p>
					{/if}
					<div class="flex flex-row justify-center items-center w-full mt-6">
						<button
							type="button"
							class="text-white bg-red-600 bg-opacity-80 rounded-sm py-3 px-7 poppins-medium"
						>
							<a class="w-full h-full" href="/products">View All Products</a>
						</button>
					</div>
				</div>
			</div>
		</div>
	</NewContainer>
</div>

<style>
	* {
		@apply transition-none;
	}
</style>
