<script lang="ts">
	import type { PageData } from "./$types";
    import type {User} from "lucia"
    export let data:PageData
    let visitedUser:User , user:User|null,products:Product[],userLinks:UserLink[]
    $:({visitedUser,user,products} = data)
    import ProfilePage from "$lib/components/new/ProfilePage.svelte"
	import type { Product, UserLink } from "$lib/types";
</script>

<ProfilePage actualUser={user} {visitedUser} {products} links={userLinks} onUpload={()=>{}}/>