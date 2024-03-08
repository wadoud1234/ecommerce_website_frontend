<script lang="ts">

	import { CldImage, CldUploadButton, CldUploadWidget } from "svelte-cloudinary";
	import ProductCarousel from "./ProductCarousel.svelte";
	import  type{ ProductsDataType } from "$lib/data";
    import type {User} from "lucia"
	import { BadgePlus, ImageUp, Link, XCircle } from "lucide-svelte";
	import ProfileLink from "./ProfileLink.svelte";
	import Button from "../ui/button/button.svelte";
	import type { LinkProviders } from "$lib/types";
	import { goto, invalidateAll} from "$app/navigation";

    export let user:User
    export let products:ProductsDataType
    export let onUpload:Function
    export let links:{id:string,link:string;provider:LinkProviders}[]|null
</script>
<div class="ProfilePage w-full flex flex-col items-start justify-start gap-4 ">
	<div class="h-full w-full flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start gap-5 md:gap-20 px-4 ">
		<div class="profilePicture max-w-48  min-w-48 flex flex-col gap-2">
			{#if user?.avatar}
			<div class="group flex flex-col justify-center items-center min-w-full min-h-full">
				<CldImage backgroundRemoval  width={192} length={192} src={user?.avatar} class="min-w-full min-h-full relative object-fill rounded-xl"  />
				
			</div>
			{:else}
				<div
					class="group flex flex-col items-center justify-center min-w-48 max-w-48 max-h-48 min-h-48 dark:bg-zinc-800 bg-zinc-200 rounded-full"
				>
					<!-- TODO -->
					<span class="group-hover:hidden text-2xl">{user?.name?.slice(0, 2).toUpperCase()}</span>
					
				</div>
			{/if}
            <!-- onSuccess={()=>{goto('/profile',{invalidateAll:true}) }}-->
			<CldUploadButton
        onQueuesEnd={()=>{
            console.log("HELLO END");
                const url = new URL('/profile?refresh=true')
                invalidateAll()
            goto(url,{invalidateAll:true})
            } }
					uploadPreset={'user_avatars'}
					class="flex items-center justify-center py-2 px-2 gap-2 border border-zinc-400 rounded-md min-w-full"
					{onUpload}
				>
					<ImageUp /> Change 
				</CldUploadButton>
			<CldUploadWidget uploadPreset="user_avatars" />

		</div>
		<div class="USER_INFO flex flex-col items-start justify-center h-full w-full py-2 gap-4">
			<div class="flex flex-col items-center justify-center md:items-start md:justify-center h-full w-full">
				<h3 class="font-medium text-2xl mb-1">{user?.name ?? ''}</h3>
				<p class="text-base mb-2">{user?.email ?? ''}</p>
				<p class="text-sm">{user?.description ?? 'Description ....'}</p>
			</div>
            {#if links && links?.length >0}
			<div class="flex flex-col md:flex-row w-full flex-wrap gap-2 md:gap-5 items-center">
				<h3 class="font-poppins text-lg font-medium underline underline-offset-2">Links :</h3>
                <div class="flex flex-row gap-2 flex-wrap">

                {#each links as {link,provider}}
                    <ProfileLink {link} {provider}/>
                {/each}
                <Button href="/profile/settings" class="flex flex-row items-center justify-center gap-2">
                    <Link/>Add Link
                </Button>
                </div>
			</div>
            {/if}
		</div>
	</div>
	<div class="flex flex-col w-full items-center justify-center md:justify-start md:items-start gap-4">
		<h1 class="text-2xl font-medium">My Products :</h1>
        {#if products && products?.length>0}
		    <ProductCarousel {products} />
        {:else}
            <div class="w-full text-center py-4 flex flex-col gap-2 items-center">
                <p class="text-red-700 flex items-center justify-center w-full gap-2 text-lg">
                    <XCircle/>Oops !
                </p>
                <p class="text-center ">No Products Found</p>
                {#if user}
                <Button size="lg"  class="w-fit gap-2">
                    <BadgePlus/> Add Product 
                </Button>
                {/if}
            </div>
        {/if}

	</div>
	
</div>