<script lang="ts">
	import { z } from 'zod';
	import { page } from '$app/stores';
	import {  invalidateAll, replaceState } from '$app/navigation';
	import ProfilePage from '$lib/components/new/ProfilePage.svelte';
	import type { User } from 'lucia';
	import type { LinkProviders, Product, onUploadImageResponse } from '$lib/types';
	import toast from "svelte-french-toast"
	export let data:any;
	
	const url = $page.url
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
					
			await invalidateAll() 
			replaceState(url,{refresh:true})
			toast.success("Avatar updated")
		}else{
			toast.error("Something went wrong")
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

	</script>

<ProfilePage actualUser={user} visitedUser={user} {onUpload} {products} {links} isAdmin />
