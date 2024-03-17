<script lang="ts">
	import type { PageData } from "./$types";
    export let data:PageData
    import ProfilePage from "$lib/components/new/ProfilePage.svelte"
</script>

<ProfilePage 
    actualUser={data?.user} 
    visitedUser={data.visitedUser} 
    productsPromise={data.productsPromise} 
    linksPromise={data.userLinksPromise} 
    onUpload={()=>{}}
/>