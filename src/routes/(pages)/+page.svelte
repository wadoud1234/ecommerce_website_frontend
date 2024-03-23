<script lang="ts">
	import NewContainer from '$lib/components/new/NewContainer.svelte';
	import Separator from '$lib/components/new/Separator.svelte';
	import { categories } from '$lib/data';
	import HeroSection from '$lib/components/new/Home/HeroSection.svelte';

	// import HeroSection from '$lib/components/new/HeroSection.svelte';
	import CategoryCarousel from '$lib/components/new/CategoryCarousel.svelte';
	import ProductCarousel from '$lib/components/new/ProductCarousel.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	export let data:PageServerData
	$:categoryName=$page.url.searchParams?.get?.("category")||""
	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Home page" />
</svelte:head>

<div class="w-full h-full min-h-screen py-10 HomePage">
	<NewContainer>
		<div class="flex flex-col w-full gap-6">

			<!-- HERO SECTION -->
			<!-- <div class="HeroSection flex flex-row items-start min-h-fit md:h-[450px] w-full lg:h-[380px]">
				<div
					class="flex-col hidden h-full gap-0 py-4 border border-l-0 NavMenu border-y-0 border-r-1 border-zinc-300 dark:border-zinc-700 min-w-48 md:flex"
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
			<Separator /> -->
			
			<HeroSection/>
			<!-- SEARCH BY CATEGORY -->
			<section class="py-5">
				<h3
					class="flex flex-row items-center justify-start h-8 gap-2 mb-4 text-sm font-semibold text-red-600 dark:text-red-500"
				>
					<div class="h-full text-transparent bg-red-600 rounded-md min-w-4 dark:bg-red-500">
						{'.'}
					</div>
					Categories
				</h3>
				<div class="flex flex-col gap-6">
					<p class="text-2xl poppins-medium">Browse By Categories</p>
					<CategoryCarousel {categories}/>
					{#await data.categoryProductsPromise}
						<p>Wait we are fetching products</p>
					{:then data}
						<p>Products Are available</p>
						{#if data && data.length>0}
							<ProductCarousel products={data} classNames="my-4"/>
						{:else if (!data || data.length<=0) && categoryName && categoryName.length>0}
							<p class="text-xl poppins-medium h-[330px] w-full flex flex-col items-center justify-center">No Products Found For Selected Category</p>
						{/if}
					{/await}
					
				</div>
			</section>
			
			<Separator />

			<!-- Best Selling Products -->
			<section class="py-5">
				<h3
					class="flex flex-row items-center justify-start h-8 gap-2 mb-4 text-sm font-semibold text-red-600 dark:text-red-500"
				>
					<div class="h-full text-transparent bg-red-600 rounded-md min-w-4 dark:bg-red-500">
						{'.'}
					</div>
					This Month
				</h3>
				<div class="flex flex-col gap-6">
					<div class="flex flex-row items-center justify-between">
						<p class="text-2xl poppins-medium">Best Selling Products</p>
						<button aria-label="View All Products"
							type="button"
							class="py-3 text-white bg-red-600 rounded-sm bg-opacity-80 px-7 poppins-medium"
							>
								<a class="w-full h-full" href="/products">View All</a>
							</button
						>
					</div>
					{#await data.productsPromise}
						<p>Wait we are fetching products</p>
					{:then products}
						{#if products && products?.length>0}
							<ProductCarousel {products} />
						{:else}
							<p class="text-xl poppins-medium h-[100px] w-full flex flex-col items-center justify-center">No Products Found</p>
						{/if}
					{/await}
					
				</div>
			</section>
			<Separator />
			
			<section class="py-5">
				<h3
					class="flex flex-row items-center justify-start h-8 gap-2 mb-4 text-sm font-semibold text-red-600 dark:text-red-500"
				>
					<div class="h-full text-transparent bg-red-600 rounded-md min-w-4 dark:bg-red-500">
						{'.'}
					</div>
					Our Products
				</h3>
				<div class="flex flex-col gap-6">
					<div class="flex flex-row items-center justify-between">
						<p class="text-2xl poppins-medium">Explore Our Products</p>
					</div>
					{#await data.productsPromise}
						<p>Wait we are fetching products</p>
					{:then products}
						{#if products && products?.length>0}
							<ProductCarousel {products} />
						{:else}
							<p class="text-xl poppins-medium h-[100px] w-full flex flex-col items-center justify-center">No Products Found</p>
						{/if}
					{/await}
					<div class="flex flex-row items-center justify-center w-full mt-6">
						<button aria-label="View All Products"
							type="button"
							class="py-3 text-white bg-red-600 rounded-sm bg-opacity-80 px-7 poppins-medium"
						>
							<a class="w-full h-full" href="/products">View All Products</a>
						</button>
					</div>
				</div>
			</section>
		</div>
	</NewContainer>
</div>

<style>
	* {
		@apply transition-none;
	}
</style>
