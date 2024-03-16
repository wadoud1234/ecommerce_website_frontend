<script lang="ts">
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
	import {  Edit, Save, XCircle } from "lucide-svelte";
	import Button from "../ui/button/button.svelte";
	import { goto } from "$app/navigation";
    import { Circle } from "svelte-loading-spinners"
    import toast from "svelte-french-toast"
    export let isAdmin:boolean=false
    export let description:string
    let editedData = description
    export let userName:string
    let status:"EDIT"|"READ"="READ"
    const toggle=()=>{
        editedData=description
        status = status==="EDIT"?"READ":"EDIT"
    }
    let loading=false
    const updateDescription = async (e:Event)=>{
        e.preventDefault()
        loading=true
        try{
        const response = await fetch(`/api/profile/user-description`, {
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({description:editedData,userName})            
        })
        loading=false
        toast.success("Description updated")
        goto("/profile", {invalidateAll:true,replaceState:true})
        toggle()
        }catch(e){
        }
    }
    
</script>
<form class="flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start w-full gap-4 mt-2 h-fit"
     on:submit|preventDefault={updateDescription}
>
    {#if status==="EDIT" && isAdmin}
        <Textarea 
            rows={3}
            bind:value={editedData}
            color="text-zinc-400"
            class="flex-1 resize-none placeholder: text-base border bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 w-[80%]"
        />
        <div class="flex flex-col gap-2 items-center justify-start max-w-fit">
            <Button 
                class="bg-zinc-200 text-black hover:bg-zinc-300 dark:bg-inherit border border-zinc-400 gap-2 dark:text-zinc-300 dark:hover:bg-zinc-800 flex flex-row items-center justify-start w-full py-2"
                type="submit" 
                size="sm"
            >
            {#if loading}
                <Circle size={20} color="red"/> Wait
            {:else}
                <Save size={20}/> Save
            {/if}
            </Button>
            <Button 
                class="bg-red-600 hover:bg-red-700 text-white dark:bg-inherit  border-zinc-400 gap-2 dark:text-zinc-300 dark:bg-red-600 dark:hover:bg-red-500 flex flex-row items-center justify-start w-full"
                type="reset" 
                size="sm"
                on:click={toggle}
            >
            <!-- on:click={toggle} -->
                <XCircle size={20}/> Cancel
            </Button>
        </div>
    {:else}
        <p class="flex-1 text-base text-center md:text-start w-[80%]">
            {description || "Add Description ..."}
        </p>
        {#if isAdmin}
            <Button 
                class="bg-zinc-200 text-black hover:bg-zinc-300 dark:bg-inherit border border-zinc-400 gap-2 dark:text-zinc-300 dark:hover:bg-zinc-800 py-2"
                type="button"
                on:click={toggle} 
                size="sm"
            >
                <Edit size={20}/> Edit
            </Button>
        {/if}
    {/if}
</form>