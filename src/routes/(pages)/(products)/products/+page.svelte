<script lang="ts">
	import LinkAddress from '$lib/components/new/LinkAddress.svelte';
	import type { User } from 'lucia';
	import { goto } from '$app/navigation';
	import { ChevronDown, ChevronRight } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import NewProductCard from '$lib/components/new/NewProductCard.svelte';
	let user: User | null = null;
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import { onMount } from 'svelte';
	import { generateSlug } from '$lib/helpers/strings';
	import {
		GetProductsQuery,
		handleAddCategory,
		handlePriceFilterInput,
		handlePriceFilterReset,
		handleRemoveCategory,
		validatePriceFilter
	} from './handlers';
	import { page } from '$app/stores';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { derived, writable } from 'svelte/store';
	import filtersStore from './filtersStore';

	// let selectedCategories = new Array<string>();
	let isPriceFilterErrorExist = false;
	let showFilters = false;
	// let pageNumber = 1;
	// let minPrice = 0;
	// let maxPrice = 0;
	let showCategoryFilter = true;
	let showPriceFilter = true;
	export let data: PageData;

	onMount(() => {
		$filtersStore.selectedCategories =
			data?.selectedCategories.length > 0 ? [...data.selectedCategories] : [];
	});

	let productsQuery = GetProductsQuery($page.url.pathname, data.products);
	const client = useQueryClient();
	async function handlePriceFilterNavigation() {
		isPriceFilterErrorExist = validatePriceFilter($filtersStore.maxPrice, $filtersStore.minPrice);
		if (!isPriceFilterErrorExist) {
			$filtersStore.minPrice > 0
				? $page.url.searchParams.set('minPrice', String($filtersStore.minPrice))
				: $page.url.searchParams.delete('minPrice');
			$filtersStore.maxPrice > 0
				? $page.url.searchParams.set('maxPrice', String($filtersStore.maxPrice))
				: $page.url.searchParams.delete('maxPrice');
			// goto($page.url.toString(), { invalidateAll: true }).then(() => console.log('Routed'));
			await client.invalidateQueries({ refetchType: 'all', queryKey: ['products'] });
		}
	}
	async function handleSelectedCategoriesChangeNavigation(selectedCategories: string[]) {
		await client.invalidateQueries({ refetchType: 'all', queryKey: ['products'] });
		$page.url.searchParams.set('category', selectedCategories.join(','));

		// goto($page.url.toString(), { invalidateAll: true });
	}
	function handleOnCheckedCategory(checked: boolean | 'indeterminate', category: string) {
		if (checked) {
			$filtersStore.selectedCategories = handleAddCategory(
				category,
				$filtersStore.selectedCategories
			);
		} else {
			$filtersStore.selectedCategories = handleRemoveCategory(
				category,
				$filtersStore.selectedCategories
			);
		}
		handleSelectedCategoriesChangeNavigation($filtersStore.selectedCategories);
	}
</script>

<div class="flex flex-col items-start justify-start w-full h-full min-h-full gap-8 min-w-screen">
	<div
		class="flex flex-row flex-wrap items-center justify-between w-full h-full min-w-full md:flex-nowrap"
	>
		<LinkAddress />
		{#if user && user?.name}
			<p class="w-full text-sm text-right">
				Welcome! <span class="font-medium text-red-600 dark:text-red-500 poppins-regular"
					>{user?.name}</span
				>
			</p>
		{/if}
	</div>
	<main
		class="flex flex-row items-start justify-start w-full h-full max-w-full min-h-full gap-3 sm:gap-6 mainSection relative"
	>
		<div class={` h-full  max-h-full flex flex-col gap-6 relative `}>
			<Button
				size="icon"
				on:click={() => {
					showFilters = !showFilters;
				}}
			>
				<ChevronRight class={`${showFilters ? 'rotate-90' : ''}`} />
			</Button>
			<!-- <Button
				aria-label="Filter"
				class="flex flex-row items-center w-full gap-4 border bg-inherit text-inherit border-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
				on:click={handleFilter}
			>
				<SlidersHorizontal size="16" />Filter
			</Button> -->

			<!-- Category Filter -->

			<div
				class={` flex-col w-[120px] md:w-[200px] gap-10 ${
					showFilters ? 'flex  bg-white dark:bg-inherit ' : 'hidden'
				}`}
			>
				<h3 class="-mb-8 text-lg font-medium underline">Filters</h3>
				<div class={`flex flex-col gap-3 filtersList`}>
					<button
						type="button"
						aria-label="Filter"
						on:click={() => {
							showCategoryFilter = !showCategoryFilter;
						}}
						class="flex flex-row items-center justify-between text-base font-medium"
					>
						Categories <ChevronDown class={`${showCategoryFilter ? 'rotate-180' : ''}`} />
					</button>
					<!-- {#if showCategoryFilter} -->
					<div class={`${showCategoryFilter ? 'flex' : 'hidden'} flex-col w-full gap-2`}>
						{#each [...data?.categories] as category}
							<!-- <button
								aria-label="Filter"
								class="flex flex-row items-center justify-start gap-4"
								on:click={() => {
									selectedCategory = category;
									console.log({ selectedCategory });

									client.invalidateQueries({ refetchType: 'all', queryKey: ['products'] });
								}}
							>
								<input
									type="radio"
									name="category"
									id="category"
									value={category}
									checked={selectedCategory === category}
									on:click={(e) => {
										selectedCategory = e.currentTarget.value;
										client.invalidateQueries({ refetchType: 'all', queryKey: ['products'] });
									}}
								/>
								<label for="category">
									<button
										aria-label="Filter"
										class="w-full text-sm"
										on:click={() => {
											selectedCategory = category;
										}}
									>
										{category}
									</button>
								</label>
							</button> -->
							<div class="flex flex-row items-center gap-2">
								<Checkbox
									checked={[...$filtersStore.selectedCategories].includes(generateSlug(category))}
									value={category}
									onCheckedChange={(checked) => handleOnCheckedCategory(checked, category)}
								/>
								<Label class="text-base">{category}</Label>
							</div>
						{/each}
					</div>
					<!-- {/if} -->
				</div>
				<div class="flex flex-col items-start justify-start gap-2">
					<div class="flex flex-row items-center justify-between w-full">
						<h3 class="text-base font-medium">Price</h3>
						<Button
							size="icon"
							on:click={() => (showPriceFilter = !showPriceFilter)}
							class="bg-inherit text-inherit hover:bg-inherit hover:text-inherit"
							><ChevronDown class={`${showPriceFilter ? 'rotate-180' : ''}`} /></Button
						>
					</div>
					<div
						class="flex-col sm:flex-row items-center gap-2 {showPriceFilter ? 'flex' : 'hidden'}"
					>
						<div class="flex flex-col gap-1">
							<Label
								class={`font-medium ${isPriceFilterErrorExist ? 'text-red-500' : ''}`}
								for="min_price">min</Label
							>

							<Input
								type="number"
								name="min_price"
								id="min_price"
								placeholder="min"
								class={`${isPriceFilterErrorExist ? 'border-red-500' : ''}`}
								min={0}
								bind:value={$filtersStore.minPrice}
								on:input={(e) => {
									$filtersStore.minPrice = handlePriceFilterInput(e);
								}}
							/>
						</div>
						<div class="flex flex-col gap-1">
							<Label
								class={`font-medium ${isPriceFilterErrorExist ? 'text-red-500' : ''}`}
								for="max_price">max</Label
							>
							<Input
								type="number"
								name="max_price"
								id="max_price"
								placeholder="min"
								class={`${isPriceFilterErrorExist ? 'border-red-500' : ''}`}
								min={0}
								bind:value={$filtersStore.maxPrice}
								on:input={(e) => {
									$filtersStore.maxPrice = handlePriceFilterInput(e);
								}}
							/>
						</div>
					</div>
					<div class="flex flex-row flex-wrap gap-2">
						<Button
							type="button"
							aria-label="Price Filter"
							class={showPriceFilter ? '' : 'hidden'}
							size="sm"
							on:click={handlePriceFilterNavigation}>GO</Button
						>
						<Button
							class={`bg-destructive text-white hover:bg-red-500 ${showPriceFilter ? '' : 'hidden'}`}
							aria-label="Reset Price Filter"
							size="sm"
							type="button"
							on:click={handlePriceFilterReset}
						>
							Reset
						</Button>
					</div>
				</div>
				<!-- Price Filter -->
				<!-- <div class="flex flex-col gap-2 filtersList">
				<button
					type="button"
					aria-label="Filter"
					on:click={() => {
						showPriceFilter = !showPriceFilter;
					}}
					class="flex flex-row items-center justify-between text-lg"
				>
					Price <ChevronDown />
				</button>
				{#if showPriceFilter}
					<div class="flex flex-col w-full gap-1">
						{#each ['all', ...priceFilterList] as priceFilter}
							<button
								aria-label="Filter"
								class="flex flex-row items-center justify-start gap-4"
								on:click={() => {
									selectedPrice = priceFilter;
								}}
							>
								<input
									type="radio"
									name="price"
									id="price"
									value={priceFilter}
									checked={selectedPrice === priceFilter}
									on:click={(e) => {
										const currentValue = e.currentTarget.value;
										if (priceFilterList.includes(currentValue)) {
											selectedPrice = e.currentTarget.value;
										}
										selectedPrice = '';
									}}
								/>
								<label for="price">
									<button
										aria-label="Price Filter"
										class="w-full text-sm"
										on:click={() => {
											selectedPrice = priceFilter;
										}}
									>
										{priceFilter}
									</button>
								</label>
							</button>
						{/each}
					</div>
				{/if}
			</div> -->

				<!-- Rating Filter -->
				<!-- <div class="flex flex-col gap-2 filtersList">
				<button
					type="button"
					aria-label="Rating Filter"
					on:click={() => {
						showRatingFilter = !showRatingFilter;
					}}
					class="flex flex-row items-center justify-between text-lg"
				>
					Rating <ChevronDown />
				</button> -->
				<!-- {#if showRatingFilter}
					<div class="flex flex-col w-full gap-1">
						{#each [5, 4, 3, 2, 1] as ratingFilter}
							<button
								aria-label="Rating Filter"
								class="flex flex-row items-center justify-start gap-4"
								on:click={() => {
									selectedRating = ratingFilter;
								}}
							>
								<input
									type="radio"
									name="price"
									id="price"
									value={ratingFilter}
									checked={selectedRating === ratingFilter}
									on:click={(e) => {
										const currentValue = e.currentTarget.value;
										if (priceFilterList.includes(currentValue)) {
											selectedRating = Number(e.currentTarget.value);
										}
										selectedRating = 1;
									}}
								/>
								<label for="price">
									<button
										type="button"
										aria-label="Rating Filter"
										on:click={() => {
											selectedRating = ratingFilter;
										}}
									>
										<StarRatingBlock starSize={15} score={ratingFilter} />
									</button>
								</label>
							</button>
						{/each}
					</div>
				{/if} -->
				<!-- </div> -->
			</div>
		</div>

		<div
			class="items-stretch justify-between flex-1 w-full h-full max-w-full min-h-full pl-3 sm:pl-6 border border-r-0 border-zinc-300 border-y-0"
		>
			{#if $productsQuery.isLoading || $productsQuery.isFetching || $productsQuery.isRefetching}
				<p>Loading...</p>
			{:else if $productsQuery.error}
				<p>
					Something wrong happened , click <a href="/products"><u>here</u></a> to refresh the page
				</p>
			{/if}
			<!-- {#await $productsQuery.data} -->
			<!-- <p>Loading...</p> -->
			{#if $productsQuery.data}
				{#if $productsQuery.data?.length > 0}
					<div
						class="grid w-full h-full max-w-full max-h-full min-w-full min-h-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-6 gap-x-3"
					>
						{#each $productsQuery.data as product}
							<NewProductCard productToShow={product} />
						{/each}
					</div>
				{:else}
					<p class="flex flex-row items-center justify-center flex-1 text-xl">No Products Found</p>
				{/if}
			{/if}
			<Button
				class="mt-10"
				on:click={async () => {
					filtersStore.update((prev) => ({
						...prev,
						pageNumber: prev.pageNumber + 1
					}));
					await client.invalidateQueries({ queryKey: ['products'], refetchType: 'all' });
				}}>Load More</Button
			>
			<!-- <Pagination.Root
				count={$productsQuery.data?.length || 1}
				perPage={2}
				let:pages
				let:currentPage
			>
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === 'ellipsis'}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={true}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			</Pagination.Root> -->
			<!-- isVisible={currentPage == page.value}  -->
		</div>
	</main>
</div>
