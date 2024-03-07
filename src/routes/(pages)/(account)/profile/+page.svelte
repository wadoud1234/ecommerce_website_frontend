<script lang="ts">
	import { z } from 'zod';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import ProfilePage from '$lib/components/new/ProfilePage.svelte';
	import type { User } from 'lucia';
	import type { ProductsDataType } from '$lib/data';
	import type { LinkProviders } from '$lib/types';
	
	export let data: any;
	type Response = {
		event:string,
		info:{
			access_mode: string,
			asset_id:string,
			batchId:string,
			bytes:number,
			createdAt:string,
			etag:string,
			folder:string,
			format:string,
			height:number,
			id:string
			original_name:string,			
			path:string,
			placeholder:boolean,
			public_id:string,
			resource_type:string,
			secure_url:string,
			signature:string
			tags:string[],
			type:string,
			thumbnail_url:string,
			url:string,
			version:number,
			version_id:string,
			width:number
		}
	}	
	let onUpload = async (res:Response)=>{
		console.log({res});
		const publicId = res.info.thumbnail_url;
		const parseResult = z.string().safeParse(publicId)
		console.log({parseResult});
		
		if(parseResult.success){
			const avatar = parseResult.data
			const response = await fetch(`/api/profile/${user.id}`, {
				headers:{
					"Content-Type":"application/json"
				},
				method:"POST",
				body:JSON.stringify({avatar_url:avatar})
			})			
			const responseData = await response.json()
			console.log({responseData})

		}
		console.log({data});
		
	}
	let user: User;
	let products:ProductsDataType|null;
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
	
	
	let doRefresh:boolean;
	$:{
		doRefresh = $page.url.searchParams.get('refresh')=="true";
		console.log({doRefresh});
	}
	onMount(()=>{
		if(doRefresh){
			goto("/profile");
		}
	})</script>

<ProfilePage {user} {onUpload} {products} {links}/>
