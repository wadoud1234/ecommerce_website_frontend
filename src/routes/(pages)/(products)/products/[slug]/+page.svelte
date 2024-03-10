<script lang="ts">
import { products } from "$lib/data";
	import {  First, Fourth, Second, Sixth, Third } from "$lib/icons";
	import ProductCarousel from "$lib/components/new/ProductCarousel.svelte";
    import type { Product } from "$lib/types"
	import type { User } from "lucia";
	import { invalidateAll } from "$app/navigation";
	import { onMount } from "svelte";
    import ShowProductImages from "$lib/components/new/ShowProductImages.svelte"
    let productImages = [First,Second,Third,Fourth,Sixth]
    export let data:{product:Product,images:string[],user:User|null};
    let cursor:number=0
    $:console.log(cursor);
    // let productImages:string[]
    let product:any;
    $:product=data?.product
    $:console.log({data});
    // let images:string[]
    // $:  productImages=[
    //     "user_avatars/qvlw29ezlcae9p0mol2n","user_avatars/crqsijryfhl4aojgzxso","user_avatars/ffocxrnhmu6q9jcuhwop","user_avatars/qyjf9fol62mvwotczcua","user_avatars/jq3c7n5kthldtojzoitw"]
    $:productImages=data?.images
    onMount(()=>{ 
        invalidateAll()
    })
</script>
<div class="flex w-full min-h-full  md:min-h-full min-w-full flex-col justify-start gap-10">
    
    <!-- First Section -->
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
        <ProductCarousel {products}/>
    </div>
</div>