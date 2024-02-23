<script lang="ts">
	import NavItem from '$lib/components/new/NavItem.svelte';
	import NewCategoryCard from '$lib/components/new/NewCategoryCard.svelte';
	import NewContainer from '$lib/components/new/NewContainer.svelte';
	import NewProductCard from '$lib/components/new/NewProductCard.svelte';
	import Separator from '$lib/components/new/Separator.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import { products, categories } from './data';
	import { HeroSectionImage, RightArrowIcon } from '$lib/icons';
	import { AppleSolid, ArrowRightOutline } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	let pathname = $page.url.pathname;
	let queries = $page.url.searchParams;
</script>

<div class="HomePage w-full min-h-screen h-full">
	<NewContainer>
		<div class="flex flex-col">
			<div class="HeroSection flex flex-row items-start">
				<div
					class="NavMenu border border-y-0 border-l-0 border-r-1 border-gray-300 min-w-48 py-4 flex flex-col gap-0"
				>
					<NavItem title="Women's Fashion">
						<button>
							<img src={RightArrowIcon} alt="enter" width="24" />
						</button>
					</NavItem>
					<NavItem title="Men's Fashion">
						<button>
							<img src={RightArrowIcon} alt="enter" width="24" />
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

				<div class="Slider pl-6 pt-6 w-full">
					<div class="bg-black min-w-full w-full flex-1 flex justify-between p-8">
						<div class="flex flex-col justify-center text-white gap-6 pl-6">
							<p class="flex items-center gap-6 text-sm font-sans">
								<AppleSolid class="w-12 h-12" /> iphone 14 Series
							</p>
							<h3 class="text-5xl font-sans font-semibold">
								Up to 10% <br class="mb-5" />off Voucher
							</h3>
							<button
								class="underline underline-offset-1 flex gap-2 text-lg items-center hover:bg-white hover:text-black rounded-md w-fit px-3 py-2"
								>Shop Now<ArrowRightOutline class="w-6" /></button
							>
						</div>
						<img src={HeroSectionImage} alt="hero" width="400" class="z-10" loading="lazy" />
					</div>
				</div>
			</div>
			<Separator />
			<!-- Search By Category -->
			<div>
				<h3
					class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 font-semibold h-8 mb-4"
				>
					<div class="min-w-4 h-full bg-red-600 rounded-md text-transparent">{'.'}</div>
					Categories
				</h3>
				<div class="flex flex-col gap-6">
					<p class="text-2xl poppins-medium">Browse By Categories</p>
					<Carousel.Root id="carousel" opts={{ align: 'start' }} orientation="horizontal">
						<Carousel.Content class="transition-none duration-0">
							{#each categories as { name, Icon }}
								<Carousel.Item class="basis-1/3 lg:basis-1/5">
									<NewCategoryCard {name} {Icon} />
								</Carousel.Item>
							{/each}
						</Carousel.Content>
						<Carousel.Previous class="bg-black text-white" />
						<Carousel.Next class="bg-black text-white" />
					</Carousel.Root>
					<!-- <div class="flex flex-row w-full overflow-hidden justify-between">
						<NewCategoryCard details={{ name: 'Phones', picture: MobileIcon }} />
						<NewCategoryCard details={{ name: 'Computers', picture: ComputerIcon }} />
						<NewCategoryCard details={{ name: 'Smartwatches', picture: SmartwatchIcon }} />
						<NewCategoryCard details={{ name: 'Camera', picture: CameraIcon }} />
						<NewCategoryCard details={{ name: 'Headphone', picture: HeadphoneIcon }} />
					</div> -->
				</div>
			</div>
			<Separator />
			<!-- Best Selling Products -->
			<div>
				<h3
					class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 font-semibold h-8 mb-4"
				>
					<div class="min-w-4 h-full bg-red-600 rounded-md text-transparent">{'.'}</div>
					This Month
				</h3>
				<div class="flex flex-col gap-6">
					<div class="flex flex-row items-center justify-between">
						<p class="text-2xl poppins-medium">Best Selling Products</p>
						<button class="text-white bg-red-600 bg-opacity-80 rounded-sm py-3 px-7 poppins-medium"
							>View All</button
						>
					</div>
					<Carousel.Root id="carousel" opts={{ align: 'start' }} orientation="horizontal">
						<Carousel.Content class="transition-none duration-0">
							{#each [...products.slice(0, 12)] as { id, name, price, picture, discount, rating, sold }}
								<Carousel.Item class="basis-1/3 lg:basis-1/4">
									<NewProductCard
										details={{
											id,
											name,
											price,
											picture,
											discount,
											rating,
											sold
										}}
									/>
								</Carousel.Item>
							{/each}
						</Carousel.Content>
						<Carousel.Previous class="bg-black text-white" />
						<Carousel.Next class="bg-black text-white" />
					</Carousel.Root>
					<!-- <div class="grid grid-rows-1 grid-cols-4 gap-y-6 w-full overflow-x-hidden">
						{#each products as { name, price, picture, discount, rating, sold }}
							<NewProductCard
								details={{
									name,
									price,
									picture,
									discount,
									rating,
									sold
								}}
							/>
						{/each}
					</div> -->
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
