<script lang="ts">
	import { type Product } from "$lib/types";
	import { CldImage } from "svelte-cloudinary";
	import StarRatingBlock from "./StarRatingBlock.svelte";
	import Separator from "./Separator.svelte";
	import ProductQuantityCounter from "./ProductQuantityCounter.svelte";
	import Button from "../ui/button/button.svelte";
	import { HeartIcon, SendHorizonal } from "lucide-svelte";
	import Label from "../ui/label/label.svelte";
	import Input from "../ui/input/input.svelte";
	import type { User } from "lucia";
	import { generateSlug } from "$lib/helpers/strings";

    export let productImages:string[]
    let cursor:number=0
    export let product:Product;
    export let seller:User
    export let productCategory:string
</script>

<div class="flex flex-col md:flex-row items-start justify-start w-full min-w-full lg:max-h-[500px] gap-2 sm:gap-4 md:gap-8 lg:gap-20 h-fit ">
    <!-- OTHERS THAN MD -->
    <div class="flex md:hidden lg:flex flex-row items-start min-h-full h-[400px] w-full lg:h-[500px] justify-between gap-2 sm:gap-4 lg:gap-8">
        <div class="flex flex-col items-center justify-center h-full gap-4 ">
            {#each [...productImages?.filter((_,i)=>i!=cursor)] as image}
                <button class="bg-zinc-700 max-w-[88px] min-w-[88px] w-full max-h-[88px] min-h-[88px] rounded-lg object-contain object-center" 
                    on:click={()=>{
                        cursor=productImages?.indexOf(image)
                    }}
                >
                    <CldImage src={image} alt="product-image" class="rounded-lg hover:scale-110 transition-all duration-200 w-[88px] h-[88px] p-2" />
                </button>
            {/each}
        </div>
        <div class="flex-1 min-h-full h-full w-full lg:w-auto flex flex-col justify-center items-center p-4 bg-zinc-400 rounded-xl">
            <CldImage src={productImages?.[cursor]} alt="main-product-image" class=" rounded-md max-w-[200px] sm:max-w-[300px] md:max-w-[260px] lg:max-w-[290px] lg:w-[300px] h-auto object-center object-contain hover:scale-110 md:hover:scale-125 duration-200 transition-all"/>
        </div>
    </div>
    <!-- MD ONLY -->
    <div class="hidden md:flex lg:hidden h-full min-h-full max-h-full w-full flex-col justify-between gap-1">
        <div class="flex-1 w-full md:max-w-full lg:min-w-[290px] flex flex-col justify-center items-center bg-zinc-400 p-4 min-h-full rounded-xl">
            <CldImage src={productImages?.[cursor]} alt="main-product-image" class=" rounded-md md:h-[350px] md:max-w-[250px] lg:max-w-[290px] lg:w-[300px] h-auto object-center object-contain md:hover:scale:110 lg:hover:scale-125 duration-200 transition-all"/>
        </div>
        <div class="flex lg:hidden flex-row items-center justify-center h-full gap-4">
            {#each [...productImages?.filter((_,i)=>i!=cursor)] as image}
                <button class="bg-zinc-700 min-w-[60px] min-h-[60px] rounded-lg" on:click={()=>{
                    cursor=productImages?.indexOf(image)
                }}>
                    <CldImage 
                        src={image} 
                        alt="product-image" 
                        class=" rounded-md hover:scale-110 transition-all duration-200 w-[60px] h-[60px] p-2" 
                    />
                </button>
            {/each}
        </div>
    </div>
    <!-- Product Details -->
    <div class="w-full flex-1 flex flex-col items-center justify-center md:items-start md:justify-start h-full md:max-w-[300px] lg:max-w-[400px] xl:max-w-[700px]">
        <div class="w-full h-fit">
            <h2 class="text-2xl font-medium">{product?.name}</h2>
            <p class="flex items-center gap-2 flex-wrap w-full">
                <StarRatingBlock score={product?.rating} starSize={20} />
                <span class="text-zinc-600 text-sm dark:text-zinc-500 poppins-medium">({product?.sold||0} sold)</span> | {#if product?.quantity>0} 
                    <span class="text-green-500 dark:text-green-400 poppins-medium">
                        In Stock
                    </span>
                {:else}
                    <span class="text-red-600 dark:text-red-500 poppins-medium">
                        Sold Out
                    </span>
                {/if}
            </p>
            <p class="text-xl ">{'$'+product?.price}</p>
            <p class="my-2 text-sm w-full max-w-full">{product?.description}</p>
            <Separator classNames="w-full" padding="py-2 lg:py-3"/>
            <div class="w-full flex flex-col items-start justify-start gap-0">
                <Button 
                    href={`/users/${seller.name}`} 
                    class="bg-inherit hover:bg-inherit text-inherit p-0 gap-2 h-fit"
                >
                    <span class="text-base font-medium">Seller :</span>{seller?.name}
                </Button>
                <Button 
                    href={`/products?category=${generateSlug(productCategory)}`} 
                    class="bg-inherit hover:bg-inherit text-inherit p-0 gap-2 h-fit mb-1"
                >
                    <span class="text-base font-medium">Category :</span>{productCategory}
                </Button>
            </div>
            <h2 class="font-medium text-base -mb-2">Quantity
                {#if product?.quantity>0}
                <span class="text-zinc-600  dark:text-zinc-500 poppins-medium">
                    ({product?.quantity} left)
                </span>
                {/if}
            </h2>
            <dir class="flex flex-row items-center md:justify-center lg:justify-between w-full gap-2 md:gap-4 pl-0">
                <ProductQuantityCounter quantity={product?.quantity}/>
                <Button class="text-white  bg-red-600 dark:bg-red-500 hover:bg-red-500 dark:hover:bg-red-400 w-fit px-4 sm:px-6 lg:px-10" size="lg">Buy Now</Button>
                <Button size="icon" class="text-black  dark:bg-zinc-800 border border-zinc-400  hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:ring-2 ring-black dark:ring-white dark:text-zinc-400 bg-white px-1.5">
                    <HeartIcon />
                </Button>
            </dir>
            <Separator padding="py-2 lg:py-3" classNames="w-full"/>
            <form action="" class="w-full flex flex-col gap-2 items-start justify-start">
                <Label for="coupon">Enter Coupon to get discount :</Label>
                <div class="group flex flex-row items-center justify-start w-full rounded-md border border-zinc-700">
                <Input type="text" name="coupon" id="coupon" placeholder="Enter coupon code" class="w-full bg-inherit placeholder:text-zinc-700 dark:bg-inherit  dark:placeholder:text-zinc-400 group-focus-within:ring-2 rounded-none rounded-l-md px-2 py-1 flex-1"/>
                <Button 
                    size="icon" 
                    type="submit" 
                    class="bg-white text-black dark:bg-zinc-800 dark:text-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-none  group-focus-within:ring-2 ring-black  dark:group-focus-within:ring-transparent dark:ring-transparent ring-offset-2 transition-all rounded-r-md">
                    <SendHorizonal class="text-zinc-700 dark:text-zinc-400 h-full"/>
                </Button>
                </div>
            </form>
        </div>
    </div>
</div>