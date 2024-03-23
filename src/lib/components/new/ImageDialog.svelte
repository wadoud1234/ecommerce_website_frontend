<script lang="ts">
	import { CldImage } from "svelte-cloudinary";
    import ImageModalStore,{ closeImageModal } from "$lib/stores/ImageModalStore";
	import { X } from "lucide-svelte";
    let src:string,alt:string;
    $:{
        ({src ,alt} = $ImageModalStore);
    }
</script>
<div class="min-w-screen min-h-screen w-screen h-screen flex fixed top-0 right-0 left-0 bottom-0 items-center justify-center bg-gray-600  bg-opacity-80 z-[100]">
    <div class="max-w-auto max-h-fit md:max-w-[400px] md:max-h-[400px]  xl:max-w-[500px] xl:max-h-[500px] bg-white dark:bg-zinc-900 w-full pt-5 h-fit pb-10 bg-inherit flex flex-col items-center justify-center gap-2">
        <div class="flex flex-row items-center justify-end w-full px-5">
            <button type="button" aria-label="close" on:click={closeImageModal}>
                <X class="text-black dark:text-white"/>
            </button>
        </div>
        <CldImage loading="lazy" {src} {alt} class="px-10"/>
    </div>
</div>