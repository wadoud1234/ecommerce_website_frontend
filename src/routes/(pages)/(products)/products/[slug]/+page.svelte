<script lang="ts">
	import ProductCarousel from "$lib/components/new/ProductCarousel.svelte";
    import type { Product } from "$lib/types"
    import ShowProductImages from "$lib/components/new/ShowProductDetails.svelte"
	import type { PageData } from "./$types";
	import type { User } from "lucia";
    import LinkAddress from "$lib/components/new/LinkAddress.svelte"

    export let data:PageData
    let seller:User,user:User|null
    let productCategory:string
    $:{
        user=data.user;
        seller=data.seller
        productCategory=data.productCategory       
    }
    
</script>
<div class="flex flex-col items-start justify-start min-h-full gap-8 min-w-screen h-fir">
    <div class="flex flex-row flex-wrap items-center justify-between w-full h-full gap-2 md:flex-nowrap">
        <LinkAddress productName={data.product?.name}/>
        {#if user && user?.name}
        <p class="flex flex-row items-center gap-1 text-sm w-fit justify-items-end">
            Welcome! <span class="font-medium text-red-600 dark:text-red-500 poppins-regular">{user?.name}</span>
        </p>
        {/if}
    </div>
    <div class="flex flex-col justify-start w-full min-w-full min-h-full gap-10">

        <!-- First Section -->
        <ShowProductImages
            seller={data.seller} 
            product={data.product} 
            productImages={data.images}
            productCategory={productCategory}/>
 
    <div class="flex flex-col items-start justify-start w-full h-full gap-4">
        <h3
    		class="flex flex-row items-center justify-start h-8 gap-2 mb-4 text-sm font-semibold text-red-600 dark:text-red-500"
    	>
            <span class="h-full text-transparent bg-red-600 rounded-md min-w-4 dark:bg-red-500">
    	        {'.'}
            </span>
    		Related Products
    	</h3>
        {#await data.relatedProductsPromise}
            <p>Loading...</p>
        {:then relatedProducts}
            {#if relatedProducts && relatedProducts.length>0}
                <ProductCarousel products={relatedProducts}/>
            {:else}
                <p class="flex items-center justify-center w-full">No products found</p>
            {/if}
        {/await}
    </div>
            
        
            <div class="flex flex-col items-start justify-start w-full h-full gap-4">
                <h3
    	    		class="flex flex-row items-center justify-start h-8 gap-2 mb-4 text-sm font-semibold text-red-600 dark:text-red-500"
    	    	>
    	            <span class="h-full text-transparent bg-red-600 rounded-md min-w-4 dark:bg-red-500">
    	    	        {'.'}
                    </span>
    	    		Other Products
    	    	</h3>
                {#await data.productsPromise}
                    <p>Loading...</p>
                {:then products}
                    {#if products && products.length>0}
                        <ProductCarousel {products}/>
                    {:else}
                        <p class="flex items-center justify-center w-full">No products found</p>
                    {/if}
                {/await}
            </div>
    </div>
</div>