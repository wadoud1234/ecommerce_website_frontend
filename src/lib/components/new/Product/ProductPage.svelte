<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import type { ProductsDataType } from "$lib/data";
	import { ProductInit, type Product } from "$lib/types";
	import ProductCarousel from "../ProductCarousel.svelte";
	import ShowProductImages from "../ShowProductImages.svelte";

    export let product:Product=new ProductInit().get();
    export let productImages:string[] = ["","","","","",""]
    export let products:ProductsDataType=[]
</script>

<ShowProductImages {product} {productImages}/>
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