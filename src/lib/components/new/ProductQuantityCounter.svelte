<script lang="ts">
	import { Minus, Plus} from "lucide-svelte";
	import Button from "../ui/button/button.svelte";

    export let quantity:number
    let selected:number=0
    const increase = ()=>{
        if(selected<quantity){
            selected++
        }
        else if (selected==quantity){
            selected=quantity
        }
    }
    const decrease = ()=>{
        if(selected>0){
            selected--
        }
        else if (selected==0){
            selected=0
        }
    }
</script>

<div class="flex flex-row items-center justify-between w-fit gap-2 lg:gap-4 border dark:text-zinc-400 border-zinc-300 rounded-md ">
    <Button  aria-label="Decrease quantity"
        class="action-button bg-white dark:bg-zinc-800 border border-y-0 border-l-0 border-zinc-300 text-black dark:text-zinc-400 hover:text-white hover:bg-red-600 rounded-none rounded-l-md focus:ring-2 ring-black" size="icon"
        on:click={decrease}    
    >
        <Minus/>
    </Button>
    <p class="text-xl text-black dark:text-zinc-400 font-medium px-1">{selected}</p>
    
    <Button  aria-label="Increase quantity"
        class="action-button bg-white dark:bg-zinc-800 border border-y-0 border-r-0  border-zinc-300 text-black dark:text-zinc-400 hover:text-white hover:bg-red-600 rounded-none rounded-r-md focus:ring-2 ring-black" 
        size="icon"
        on:click={increase}
    >
        <Plus/>
    </Button>
</div>

