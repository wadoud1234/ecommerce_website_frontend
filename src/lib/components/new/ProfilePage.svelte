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
    export let productsPromise: Promise<Product[]> | null
	export let onUpload:(results:onUploadImageResponse)=>void
    export let linksPromise:Promise<UserLink[]>|null
	export let isAdmin:boolean=false
	
	$:pathname=$page.url.pathname
</script>

<div class="flex flex-col items-center justify-center w-full gap-20 ProfilePage md:items-start md:justify-start">
	<!-- USER DETAILS SECTION -->
	<section class="flex flex-col items-center justify-center w-full h-full gap-10 md:flex-row md:items-start md:justify-start md:gap-20 ">
		<div class="flex flex-col gap-2 profilePicture max-w-48 min-w-48">
			{#if visitedUser?.avatar}
			<div class="flex flex-col items-center justify-center w-48 h-48 min-w-full min-h-full max-w-48 max-h-48 rounded-xl">
				<CldImage
					backgroundRemoval  
					width={192} 
					length={192} 
					src={visitedUser?.avatar} 
					class="relative object-fill min-w-full min-h-full cursor-pointer rounded-xl" 
					on:click={openImageModal(visitedUser?.avatar,visitedUser.name)}
				/>
			</div>
			{:else}
				<div
					class="flex flex-col items-center justify-center mb-2 rounded-full min-w-48 max-w-48 max-h-48 min-h-48 dark:bg-zinc-800 bg-zinc-200"
				>
					<!-- TODO -->
					<span class="text-2xl">{visitedUser?.name?.slice(0, 2).toUpperCase()}</span>
				</div>
			{/if}
			{#if isAdmin}
				<CldUploadButton
						uploadPreset={'user_avatars'}
						class="flex items-center justify-center min-w-full gap-2 px-2 py-2 border rounded-md border-zinc-400 dark:hover:bg-zinc-800 bg-zinc-200 dark:bg-inherit hover:bg-zinc-300"
						{onUpload}
					>
						<ImageUp /> {visitedUser?.avatar ? 'Change' : 'Upload'} 
					</CldUploadButton>
				<CldUploadWidget uploadPreset="user_avatars" />
			{/if}
		</div>
		<div class="flex flex-col items-center justify-center w-full h-full gap-4 py-2 USER_INFO md:items-start md:justify-start">
			<div class="flex flex-col items-center justify-center w-full h-full md:items-start md:justify-start">
				<h3 class="mb-1 text-2xl font-medium">{visitedUser?.name ?? ''}</h3>
				<p class="mb-2 text-base">{visitedUser?.email ?? ''}</p>
				<DescriptionForm description={visitedUser?.description ?? ""} userName={visitedUser.name} {isAdmin}/>
			</div>
			{#await linksPromise}
				<p>fetching Data</p>
			{:then links}
            	{#if links && links?.length >0}
				<div class="flex flex-col flex-wrap items-center w-full gap-2 md:flex-row md:gap-5">
					<h3 class="text-lg font-medium underline font-poppins underline-offset-2">Links :</h3>
            	    <div class="flex flex-row flex-wrap gap-2">
					
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
			{/await}
		</div>
	</section>
	<!-- MY PRODUCTS SECTION -->
	<section class="flex flex-col items-center justify-center w-full md:justify-start md:items-start">
		<div class="flex flex-row items-center justify-between w-full">
			<h3 class="flex flex-row items-center justify-start h-8 gap-2 mb-4 text-sm font-semibold text-red-600 dark:text-red-500"
			>
	        	<span class="h-full text-transparent bg-red-600 rounded-md min-w-4 dark:bg-red-500">
		        	{'.'}
            	</span>
				My Products
			</h3>
			<Button 
				size="default" 
				href="/profile/add-product" 
				class="flex items-center justify-center gap-2 px-2 py-2 border rounded-md border-zinc-400 min-w-fit dark:hover:bg-zinc-800 bg-zinc-200 dark:bg-inherit text-inherit hover:bg-zinc-300 w-fit"
			>
				<BadgePlus/> Add Product 
			</Button>
		</div>
		{#await productsPromise}
			<p>fetching Data</p>
		{:then products}
    		{#if products && products?.length>0}
			    <ProductCarousel {products} />
    		{:else}
        	    <div class="flex flex-col items-center w-full gap-2 py-4 text-center">
        	        <p class="flex items-center justify-center w-full gap-2 text-lg text-red-700 dark:text-red-500">
        	            <XCircle/>Oops !
        	        </p>
        	        <p class="text-center ">No Products Found</p>
        	        {#if visitedUser.id===actualUser?.id && pathname ==='/profile'}
        	        <Button 
						size="default" 
						href="/profile/add-product" 
						class="flex items-center justify-center gap-2 px-2 py-2 border rounded-md border-zinc-400 min-w-fit dark:hover:bg-zinc-800 bg-zinc-200 dark:bg-inherit text-inherit hover:bg-zinc-300 w-fit"
					>
						<BadgePlus/> Add Product 
					</Button>
        	        {/if}
        	    </div>
    		{/if}
		{/await}

	</section>
	
</div>
