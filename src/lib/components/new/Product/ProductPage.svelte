<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { ProductInit, type Product } from "$lib/types";
	import LinkAddress from "../LinkAddress.svelte";
	import ProductCarousel from "../ProductCarousel.svelte";
    import ShowProductDetails from "../ShowProductDetails.svelte";
    export let product:Product;
    export let productImages:string[];
    export let products:Product[]
</script>

<div class="w-full h-full flex flex-wrap flex-row md:flex-nowrap justify-between items-center">
    <LinkAddress productName={product.name}/>
    {#if user && user.name}
    <p class="text-sm w-full text-right">
        Welcome! <span class="text-red-600 dark:text-red-500 poppins-regular font-medium">{user.name}</span>
    </p>
    {/if}
</div>
<ShowProductDetails {product} {productImages}/>
<div class="w-full h-full flex flex-col items-start justify-start">
    <h3
	    class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 dark:text-red-500 font-semibold h-8 mb-4"
	>
	<span class="min-w-4 h-full bg-red-600 dark:bg-red-500 rounded-md text-transparent">
	    {'.'}
    </span>
	    Related Products
    </h3>
    {#if products && products.length>0}
    <ProductCarousel {products}/>
    {:else}
    <div class="w-full h-full flex flex-row justify-center items-center">
        <p>
            No products to display
        </p>
        <Button href="/profile/add-product">Add One</Button>
    </div>
    {/if}
</div>