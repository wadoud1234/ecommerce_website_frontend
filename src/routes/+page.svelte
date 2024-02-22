<script lang="ts">
	import CategoryList from '$lib/components/Category/CategoryList.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import ProductList from '$lib/components/Product/ProductList.svelte';
</script>

<div class="flex flex-col min-w-full items-center">
	<!-- <HeroSection /> -->
	<CategoryList />
	<!-- Popular Products -->
	<ProductList title="Popular Products" />
	<ProductList title="New Products" />
</div>
