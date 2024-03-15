<script lang="ts">
	import LinkAddress from "$lib/components/new/LinkAddress.svelte";
	import { listOfCategories, type Product } from "$lib/types";
	import type { User } from "lucia";
	import { page } from "$app/stores";
	import { goto } from "$app/navigation";
	import { ChevronDown } from "lucide-svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	import StarRatingBlock from "$lib/components/new/StarRatingBlock.svelte";
	import type { PageData } from "./$types";
	import NewProductCard from "$lib/components/new/NewProductCard.svelte";
    let user:User|null=null
    let selectedCategory:string = $page.url.searchParams.get("category") || "all"
    type selectedPriceType = "0-100"|"100-300"|"300-600"|"600-1000"|"over 1000"
    let selectedPrice:string |selectedPriceType|"" =  $page.url.searchParams.get("price") || "all"
    const priceFilterList = ["0-100","100-300","300-600","600-1000","over 1000"]
    let selectedRating:number = $page.url.searchParams.get("rating") ? Number($page.url.searchParams.get("rating")) : 1;
    let showRatingFilter = false
    export let data:PageData
    let products:(Product&{images:{id:string,link:string,productId:string}[]})[]
    $:{({products}=data)}
    
    const handleFilter = ()=>{
        const url = new URL($page.url)
        if (selectedCategory && selectedCategory!=="all") url.searchParams.set("category",selectedCategory)
        else if (selectedCategory === "all") url.searchParams.delete("category")

        if(selectedPrice && selectedPrice!=="all") url.searchParams.set("price",selectedPrice)
        else if (selectedPrice === "all") url.searchParams.delete("price")
    
        if(selectedRating && selectedRating!==1) url.searchParams.set("rating",`${selectedRating}`)
        else if(selectedRating === 1) url.searchParams.delete("rating")

        goto(url,{replaceState:true})
    }
    let showCategoryFilter = false,showPriceFilter = false    
</script>
<div class="min-w-screen min-h-full h-full w-full flex flex-col items-start justify-start gap-8">
    <div class="w-full min-w-full h-full flex flex-wrap flex-row md:flex-nowrap justify-between items-center ">
        <LinkAddress/>
        {#if user && user?.name}
        <p class="text-sm w-full text-right">
            Welcome! <span class="text-red-600 dark:text-red-500 poppins-regular font-medium">{user?.name}</span>
        </p>
        {/if}
    </div>
    <main class="mainSection min-h-full max-w-full w-full h-full flex flex-row items-start justify-start gap-6">
        <div class="filters-nav h-full w-[120px] md:w-[200px]  max-h-full flex flex-col gap-4">
            <Button class="w-full" on:click={handleFilter}>Filter</Button>
            
            <!-- Category Filter -->
            <div class="filtersList flex flex-col gap-3">                
                <button on:click={()=>{showCategoryFilter=!showCategoryFilter}} class="text-lg flex flex-row items-center justify-between">
                    Categories <ChevronDown/>
                </button>
                {#if showCategoryFilter}
                <div class="flex flex-col w-full ">
                    {#each ["all",...listOfCategories] as category}
                        <button class="flex flex-row items-center justify-start gap-4" 
                        on:click={()=>{selectedCategory=category}} >
                            <input 
                                type="radio" 
                                name="category" 
                                id="category" 
                                value={category} 
                                checked={selectedCategory===category}
                                on:click={(e)=>{selectedCategory = e.currentTarget.value}}
                            />
                            <label for="category">
                                <button 
                                    class="w-full text-sm" 
                                    on:click={()=>{selectedCategory=category}}
                                >
                                    {category}
                                </button>
                            </label>
                        </button>
                    {/each}
                </div>
                {/if}
            </div>

            <!-- Price Filter -->
            <div class="filtersList flex flex-col gap-2">
                <button on:click={()=>{showPriceFilter=!showPriceFilter}} class="text-lg flex flex-row items-center justify-between">
                    Price <ChevronDown/>
                </button>
                {#if showPriceFilter}
                <div class="flex flex-col gap-1 w-full ">
                    {#each ["all",...priceFilterList] as priceFilter}
                        <button 
                            class="flex flex-row items-center justify-start gap-4" 
                            on:click={()=>{selectedPrice=priceFilter}} >
                            <input 
                                type="radio" 
                                name="price" 
                                id="price" 
                                value={priceFilter} 
                                checked={selectedPrice===priceFilter}
                                on:click={(e)=>{
                                    const currentValue = e.currentTarget.value;
                                    if(priceFilterList.includes(currentValue)){
                                        selectedPrice = e.currentTarget.value
                                    }
                                    selectedPrice = ""
                                    }}
                            />
                            <label for="price">
                                <button 
                                    class="w-full text-sm" 
                                    on:click={()=>{selectedPrice=priceFilter}}
                                >
                                    {priceFilter}
                                </button>
                            </label>
                        </button>
                    {/each}
                </div>
                {/if}
            </div>

            <!-- Rating Filter -->
            <div class="filtersList flex flex-col gap-2">
                <button on:click={()=>{showRatingFilter=!showRatingFilter}} class="text-lg flex flex-row items-center justify-between">
                    Rating <ChevronDown/>
                </button>
                {#if showRatingFilter}
                <div class="flex flex-col gap-1 w-full">
                    {#each [5,4,3,2,1] as ratingFilter}
                        <button 
                            class="flex flex-row items-center justify-start gap-4" 
                            on:click={()=>{selectedRating=ratingFilter}} >
                            <input 
                                type="radio" 
                                name="price" 
                                id="price" 
                                value={ratingFilter} 
                                checked={selectedRating===ratingFilter}
                                on:click={(e)=>{
                                    const currentValue = e.currentTarget.value;
                                    if(priceFilterList.includes(currentValue)){
                                        selectedRating = Number(e.currentTarget.value)
                                    }
                                    selectedRating = 1
                                    }}
                            />
                            <label for="price">
                                <button on:click={()=>{selectedRating=ratingFilter}}>
                                    <StarRatingBlock starSize={15} score={ratingFilter}/>
                                </button>
                            </label>
                        </button>
                    {/each}
                </div>
                {/if}
            </div>
        </div>
        <div class="flex-1 items-stretch justify-between  min-h-full h-full w-full max-w-full border border-zinc-800 border-y-0 border-r-0 pl-6 ">
            {#if products && products.length>0}
                <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-6 gap-x-3 w-full min-w-full max-w-full h-full min-h-full max-h-full">
                    {#each products as product}
                        <NewProductCard details={{...product,picture:product.picture||""}}/>
                    {/each}
                </div>
            {:else}
                <p class="flex-1 justify-center text-xl flex flex-row items-center">
                    No Products Found
                </p>
            {/if}
        </div>
    </main>
</div>