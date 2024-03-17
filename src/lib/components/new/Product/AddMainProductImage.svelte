<script lang="ts">
	import { replaceState } from "$app/navigation";
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
        replaceState($page.url.pathname,{ refresh:true })
        toast.success("Main Product Picture Uploaded !")
    }
</script>
<div class="flex flex-col items-center justify-start w-[360px] h-full gap-2">
    {#if header && header?.length>0}<p class="font-medium">{header}</p>{/if}
    <div class="h-[360px] w-[360px] bg-zinc-400 rounded-xl flex flex-col items-center justify-center">
        {#if value}
            <button class="flex flex-col items-center justify-center w-full h-full max-w-full max-h-full min-w-full min-h-full rounded-lg imageDisplay" 
                on:click={()=>openImageModal(value,"product-image")}>
                <CldImage class="max-w-[300px] max-h-[300px] min-w-[300px] min-h-[300px] rounded-lg imageDisplay w-[300px] h-[300px]" alt="test" src={value}/>
            </button>
        {/if}
    </div>
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
    /* .imageDisplay{
        @apply rounded-lg w-[100px] h-[100px] max-w-[100px] max-h-[100px] min-w-[100px] min-h-[100px] object-center object-cover;
    } */
</style>