<script lang="ts">
	import CategoryList from '$lib/components/Category/CategoryList.svelte';
	import ProductList from '$lib/components/Product/ProductList.svelte';
</script>

<div class="flex flex-col min-w-screen items-center">
	<div class="flex flex-col w-full items-center justify-center h-80 gap-4 bg-red-500">
		<p class="text-4xl text-center font-semibold from-neutral-600">Get Expensive Discounts</p>
		<button class="bg-blue-700 text-white py-2 px-4 rounded-md font-semibold">Right now !</button>
	</div>
	<CategoryList />
	<!-- Popular Products -->
	<ProductList title="Popular Products" />
	<!-- New Products -->
	<div>New Products</div>
	<div>Be a memeber</div>
	<div>Be a sponsor</div>
</div>
