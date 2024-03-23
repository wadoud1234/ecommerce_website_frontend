<script lang="ts">
	import { z } from 'zod';
	import { page } from '$app/stores';
	import { invalidateAll, replaceState } from '$app/navigation';
	import ProfilePage from '$lib/components/new/ProfilePage.svelte';
	import type { onUploadImageResponse } from '$lib/types';
	import toast from "svelte-french-toast"
	export let data:any;
	
	let url = $page.url
	let onUpload = async (res:onUploadImageResponse)=>{
		const publicId = res.info.public_id;
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
			invalidateAll()
			replaceState(url,{refresh:true});
			toast.success("Avatar updated")
		}else{
			toast.error("Something went wrong")
		}
	}
	

	</script>
<svelte:head><title>Profile</title></svelte:head>
<ProfilePage 
	actualUser={data.user} 
	visitedUser={data.user} 
	{onUpload} 
	productsPromise={data.productsPromise} 
	linksPromise={data.userLinksPromise} 
	isAdmin 
/>
