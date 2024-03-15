<script lang="ts">
	import { CldImage, CldUploadButton, CldUploadWidget } from "svelte-cloudinary";
	import ProductCarousel from "./ProductCarousel.svelte";
    import type { User } from "lucia"
	import { BadgePlus, ImageUp, Link, XCircle } from "lucide-svelte";
	import ProfileLink from "./ProfileLink.svelte";
	import Button from "../ui/button/button.svelte";
	import type { Product, UserLink, onUploadImageResponse } from "$lib/types";
	import DescriptionForm from "./DescriptionForm.svelte";
	import { page } from "$app/stores";
	import { openImageModal } from "$lib/stores/ImageModalStore";

    export let actualUser:User | null
	export let visitedUser:User
    export let products: Product[]
	export let onUpload:(results:onUploadImageResponse)=>void
    export let links:UserLink[]|null
	export let isAdmin:boolean=false
	
	let pathname:string;
	$:pathname=$page.url.pathname
</script>

<div class="ProfilePage w-full flex flex-col items-center justify-center md:items-start md:justify-start gap-10 ">
	<!-- USER DETAILS SECTION -->
	<section class="h-full w-full flex flex-col md:flex-row items-center justify-center md:items-start md:justify-start gap-10 md:gap-20 ">
		<div class="profilePicture max-w-48  min-w-48 flex flex-col gap-2">
			{#if visitedUser?.avatar}
			<div class="flex w-48 max-w-48 h-48 max-h-48 flex-col justify-center items-center min-w-full min-h-full rounded-xl">
				<CldImage
					backgroundRemoval  
					width={192} 
					length={192} 
					src={visitedUser?.avatar} 
					class="min-w-full min-h-full relative object-fill rounded-xl cursor-pointer" 
					on:click={openImageModal(visitedUser?.avatar,visitedUser.name)}
				/>
			</div>
			{:else}
				<div
					class=" flex flex-col items-center justify-center min-w-48 max-w-48 max-h-48 min-h-48 dark:bg-zinc-800 bg-zinc-200 rounded-full"
				>
					<!-- TODO -->
					<span class="text-2xl">{visitedUser?.name?.slice(0, 2).toUpperCase()}</span>
				</div>
			{/if}
			{#if isAdmin}
				<CldUploadButton
						uploadPreset={'user_avatars'}
						class="flex items-center justify-center py-2 px-2 gap-2 border border-zinc-400 rounded-md min-w-full dark:hover:bg-zinc-800 bg-zinc-200 dark:bg-inherit hover:bg-zinc-300"
						onUpload={onUpload}
					>
						<ImageUp /> {visitedUser?.avatar ? 'Change' : 'Upload'} 
					</CldUploadButton>
				<CldUploadWidget uploadPreset="user_avatars" />
			{/if}
		</div>
		<div class="USER_INFO flex flex-col items-center justify-center md:items-start md:justify-start h-full w-full py-2 gap-4">
			<div class="flex flex-col items-center justify-center md:items-start md:justify-start h-full w-full">
				<h3 class="font-medium text-2xl mb-1">{visitedUser?.name ?? ''}</h3>
				<p class="text-base mb-2">{visitedUser?.email ?? ''}</p>
				<DescriptionForm description={visitedUser?.description ?? ""} {isAdmin}/>
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
			{:else}
				<p class="w-full text-center lg:text-start">No Links Provided</p>
            {/if}
		</div>
	</section>
	<!-- MY PRODUCTS SECTION -->
	<section class="flex flex-col w-full items-center justify-center md:justify-start md:items-start">
		<h3 class="flex flex-row gap-2 text-sm items-center justify-start text-red-600 dark:text-red-500 font-semibold h-8 mb-4"
		>
	        <span class="min-w-4 h-full bg-red-600 dark:bg-red-500 rounded-md text-transparent">
		        {'.'}
            </span>
			My Products
		</h3>
    	{#if products && products?.length>0}
		    <ProductCarousel {products} />
    	{:else}
            <div class="w-full text-center py-4 flex flex-col gap-2 items-center">
                <p class="text-red-700 flex items-center justify-center w-full gap-2 text-lg">
                    <XCircle/>Oops !
                </p>
                <p class="text-center ">No Products Found</p>
                {#if visitedUser.id===actualUser?.id && pathname ==='/profile'}
                <Button size="lg" href="/profile/add-product" class="w-fit gap-2">
                    <BadgePlus/> Add Product 
                </Button>
                {/if}
            </div>
    	{/if}

	</section>
	
</div>
