<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import { Search, X } from "lucide-svelte";
	import NewSearchBar from "../NewSearchBar.svelte";
	import { page } from "$app/stores";
    let searchKeywords:string;
    const handleSearch = () => {
		const url = new URL("/products",$page.url.origin)
		if(searchKeywords && searchKeywords.length>0) {
			url.searchParams.set("keyword",searchKeywords)
		}

		window.location.href = url.href
		// goto(url,{replaceState:true,invalidateAll:true})

	};
</script>
<section class="flex items-center justify-center w-full h-full py-16">
    <div class="flex flex-col items-center justify-center h-full gap-6">
        <h1 class="flex flex-col gap-2 text-xl font-medium text-center sm:text-3xl text-zinc-900 dark:text-zinc-300 font-poppins">
            <span class="text-3xl sm:text-4xl">Welcome to SHOP</span>
            your ultimate destination for all things fabulous!</h1>
        <p class="-mt-2 text-center">Discover the latest phones, laptops, and accessories</p>
        <form on:submit={handleSearch}
        class="flex flex-row items-center justify-center relative rounded-md border border-zinc-300 dark:border-zinc-700 gap-0.5 h-10 flex-1 w-full max-w-full"
    >
        <input
            type="text"
            bind:value={searchKeywords}
            placeholder="Search for products..."
            class="w-full p-2 font-sans text-sm outline-none bg-inherit text-start"
        />
        {#if searchKeywords && searchKeywords.length>0}
            <Button  aria-label="Clear search"
                class="h-full p-0 bg-inherit text-zinc-400 hover:bg-inherit hover:text-zinc-500" 
                on:click={()=>{searchKeywords=""}}
            >
                <X/>
            </Button>
        {/if}
        <Button aria-label="Search"
            type="submit" size='icon'
            class="flex items-center justify-center min-h-full px-2 text-black border border-r-0 rounded-none border-y-0 border-zinc-300 dark:border-zinc-800 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:hover:bg-zinc-600 dark:text-zinc-400 rounded-r-md"
        >
            <Search class="min-h-full"/>
    </Button>
    </form>
     
    </div>
</section>