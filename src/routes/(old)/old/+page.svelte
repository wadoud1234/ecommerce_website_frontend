<script lang="ts">
	import CategoryList from '$lib/components/old/Category/CategoryList.svelte';
	import ProductList from '$lib/components/old/Product/ProductList.svelte';
</script>

<div class="flex flex-col min-w-full items-center">
	<!-- <HeroSection /> -->
	<CategoryList />
	<!-- Popular Products -->
	<ProductList title="Popular Products" />
	<ProductList title="New Products" />
</div>
