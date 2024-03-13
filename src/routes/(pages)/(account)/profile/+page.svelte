<script lang="ts">
	import { z } from 'zod';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import ProfilePage from '$lib/components/new/ProfilePage.svelte';
	import type { User } from 'lucia';
	import type { ProductsDataType } from '$lib/data';
	import type { LinkProviders, Product, onUploadImageResponse } from '$lib/types';
	let doRefresh:boolean;
	import toast from "svelte-french-toast"

	export let data:any;
	$:console.log({profileProducts:data?.products});
	
	
	let onUpload = async (res:onUploadImageResponse)=>{
		const publicId = res.info.thumbnail_url;
		const parseResult = z.string().safeParse(publicId)
		
		if(parseResult.success){
			const avatar = parseResult.data
			const response = await fetch(`/api/profile`, {
				headers:{
					"Content-Type":"application/json"
				},
				method:"POST",
				body:JSON.stringify({avatar_url:avatar})
			})			
			toast.success("Avatar updated")
			goto("/profile",{invalidateAll:true,replaceState:true})
		}
		
	}
	let user: User;
	let products: Product[];
	let links:{
		id:string,
		link:string,
		userId:string,
		provider:LinkProviders
	}[] | null
	$: {
		user = data.user;
		products = data.products
		links=data.links
	}
	
	
	$:{
		doRefresh = $page.url.searchParams.get('refresh')=="true";
	}
	</script>

<ProfilePage {user} {onUpload} {products} {links} />
