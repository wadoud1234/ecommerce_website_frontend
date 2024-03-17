<script lang="ts">
	import { goto, invalidate, invalidateAll, replaceState } from "$app/navigation";
	import { page } from "$app/stores";
	import Button from "$lib/components/ui/button/button.svelte";
	import { openImageModal } from "$lib/stores/ImageModalStore";
	import { ImageUp } from "lucide-svelte";
	import { CldImage, CldUploadButton } from "svelte-cloudinary";
	import toast from "svelte-french-toast";
    export let uploadPreset:string
    export let header:string = ""
    export let value:string    
    const onUpload = (result:any)=>{        
            value = (result?.info?.public_id as unknown) as string
            replaceState($page.url.pathname,{refresh:true})
            toast.success("Test")
            
        }
</script>
<div class="flex flex-col items-center justify-start gap-2 w-fit">
    {#if header && header?.length>0}<p class="font-medium">{header}</p>{/if}
    {#if value}
        <button class="rounded-lg imageDisplay" on:click={()=>openImageModal(value,"product-image")}>
            <CldImage class="rounded-lg imageDisplay" alt="test" src={value}/>
        </button>
    {:else}
        <div class="imageDisplay dark:bg-zinc-600 bg-zinc-400"></div>
    {/if}
    <Button 
        size="default" 
        class="flex items-center justify-center w-full gap-2 px-2 py-2 border rounded-md border-zinc-400 min-w-fit dark:hover:bg-zinc-800 bg-zinc-200 dark:bg-inherit text-inherit hover:bg-zinc-300"
    >
        <CldUploadButton {onUpload} {uploadPreset} class="flex flex-row items-center justify-center w-full h-full gap-2">
            <ImageUp/> {value?'Change':'Upload'}
        </CldUploadButton>
        <input type="hidden" class="hidden" bind:value={value}>
    </Button>
</div>
<style>
    .imageDisplay{
        @apply rounded-lg w-[100px] h-[100px] max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] object-center object-cover;
    }
</style>