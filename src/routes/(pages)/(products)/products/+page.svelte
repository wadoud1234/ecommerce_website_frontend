<script lang="ts">
	import LinkAddress from "$lib/components/new/LinkAddress.svelte";
	import { fromProductType2ProductToShow, listOfCategories } from "$lib/types";
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
        
    const handleFilter = () =>{
        const url = new URL($page.url)
        if (selectedCategory && selectedCategory!=="all") url.searchParams.set("category",selectedCategory)
        else if (selectedCategory === "all") url.searchParams.delete("category")

        if(selectedPrice && selectedPrice!=="all") url.searchParams.set("price",selectedPrice)
        else if (selectedPrice === "all") url.searchParams.delete("price")
    
        if(selectedRating && selectedRating!==1) url.searchParams.set("rating",`${selectedRating}`)
        else if(selectedRating === 1) url.searchParams.delete("rating")

        goto(url,{replaceState:true})
    }
    
    let showCategoryFilter = false
    let showPriceFilter = false    
</script>
<div class="flex flex-col items-start justify-start w-full h-full min-h-full gap-8 min-w-screen">
    <div class="flex flex-row flex-wrap items-center justify-between w-full h-full min-w-full md:flex-nowrap ">
        <LinkAddress/>
        {#if user && user?.name}
        <p class="w-full text-sm text-right">
            Welcome! <span class="font-medium text-red-600 dark:text-red-500 poppins-regular">{user?.name}</span>
        </p>
        {/if}
    </div>
    <main class="flex flex-row items-start justify-start w-full h-full max-w-full min-h-full gap-6 mainSection">
        <div class="filters-nav h-full w-[120px] md:w-[200px]  max-h-full flex flex-col gap-4">
            <Button class="w-full" on:click={handleFilter}>Filter</Button>
            
            <!-- Category Filter -->
            <div class="flex flex-col gap-3 filtersList">                
                <button on:click={()=>{showCategoryFilter=!showCategoryFilter}} class="flex flex-row items-center justify-between text-lg">
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
            <div class="flex flex-col gap-2 filtersList">
                <button on:click={()=>{showPriceFilter=!showPriceFilter}} class="flex flex-row items-center justify-between text-lg">
                    Price <ChevronDown/>
                </button>
                {#if showPriceFilter}
                <div class="flex flex-col w-full gap-1 ">
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
            <div class="flex flex-col gap-2 filtersList">
                <button on:click={()=>{showRatingFilter=!showRatingFilter}} class="flex flex-row items-center justify-between text-lg">
                    Rating <ChevronDown/>
                </button>
                {#if showRatingFilter}
                <div class="flex flex-col w-full gap-1">
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
        <div class="items-stretch justify-between flex-1 w-full h-full max-w-full min-h-full pl-6 border border-r-0 border-zinc-800 border-y-0 ">
            {#await data.products}
                <p>Loading...</p>
            {:then products}
                {#if products && products.length>0}
                    <div class="grid w-full h-full max-w-full max-h-full min-w-full min-h-full md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-6 gap-x-3">
                        {#each products as product}
                            <NewProductCard productToShow={fromProductType2ProductToShow(product)}/>
                        {/each}
                    </div>
                {:else}
                    <p class="flex flex-row items-center justify-center flex-1 text-xl">
                        No Products Found
                    </p>
                {/if}
            {/await}
        </div>
    </main>
</div>