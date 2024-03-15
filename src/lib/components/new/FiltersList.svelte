<script lang="ts">
	import { ChevronDown } from "lucide-svelte";

    let isOpen = false;
    const toggle = ()=>{
        isOpen = !isOpen
    }
    export let header:string
</script>
<div class="filters-list flex flex-col gap-2 bg-inherit text-inherit bg-red-600 py-2 px-1">
    <button class="flex flex-row justify-between items-center w-full" on:click={toggle}><span>{header}</span><ChevronDown/></button>
    {#if isOpen}
        <div class="hidden-filters-list flex flex-col gap-2 items-start justify-start">
            <slot name="elements"/>
        </div>
     {/if}
</div>