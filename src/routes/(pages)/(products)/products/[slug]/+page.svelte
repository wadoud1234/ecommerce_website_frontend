<script lang="ts">
	import ProductCarousel from "$lib/components/new/ProductCarousel.svelte";
    import type { Product } from "$lib/types"
    import ShowProductImages from "$lib/components/new/ShowProductDetails.svelte"
	import type { PageData } from "./$types";
	import type { User } from "lucia";
    import LinkAddress from "$lib/components/new/LinkAddress.svelte"

    export let data:PageData
    let productImages:string[]
    let product:Product
    let products:Product[]
    let relatedProducts:Product[]
    let seller:User,user:User|null
    let productCategory:string
    $:{
        user=data.user;
        product=data.product
        productImages=data?.images
        products=data.products
        relatedProducts=data.relatedProducts
        seller=data.seller
        productCategory=data.productCategory        
    }
    
</script>
<div class="min-w-screen min-h-full h-fir flex flex-col items-start justify-start gap-8">
    <div class="w-full h-full flex flex-wrap flex-row md:flex-nowrap justify-between items-center gap-2">
        <LinkAddress productName={product.name}/>
        {#if user && user.name}
        <p class="text-sm w-fit justify-items-end flex flex-row items-center gap-1">
            Welcome! <span class="text-red-600 dark:text-red-500 poppins-regular font-medium">{user.name}</span>
        </p>
        {/if}
    </div>
    <div class="flex w-full min-h-full min-w-full flex-col justify-start gap-10">

        <!-- First Section -->
        <ShowProductImages {seller} {product} {productImages} {productCategory}/>
        {#if relatedProducts && relatedProducts.length>0}
            <div class="w-full h-full flex flex-col items-start justify-start gap-4">
                <h3
    	    		class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 dark:text-red-500 font-semibold h-8 mb-4"
    	    	>
    	            <span class="min-w-4 h-full bg-red-600 dark:bg-red-500 rounded-md text-transparent">
    	    	        {'.'}
                    </span>
    	    		Related Products
    	    	</h3>
                <ProductCarousel products={relatedProducts}/>
            </div>
        {/if}
        {#if products && products.length>0}
            <div class="w-full h-full flex flex-col items-start justify-start gap-4">
                <h3
    	    		class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 dark:text-red-500 font-semibold h-8 mb-4"
    	    	>
    	            <span class="min-w-4 h-full bg-red-600 dark:bg-red-500 rounded-md text-transparent">
    	    	        {'.'}
                    </span>
    	    		Other Products
    	    	</h3>
                <ProductCarousel {products}/>
            </div>
        {/if}
    </div>
</div>