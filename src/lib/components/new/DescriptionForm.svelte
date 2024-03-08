<script lang="ts">
    import * as Form from "$lib/components/ui/form";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import TextArea from "$lib/components/ui/textarea/textarea.svelte";
	import { Cpu, Edit } from "lucide-svelte";
	import Button from "../ui/button/button.svelte";
	import { goto } from "$app/navigation";
    export let description:string
    let status:"EDIT"|"READ"="READ"
    const toggle=()=>{
        status = status==="EDIT"?"READ":"EDIT"
    }
    const updateDescription = async (e:Event)=>{
        e.preventDefault()
        
        try{
        const response = await fetch(`/api/profile/user-description`, {
            headers:{
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify({description})            
        })
        window.location.reload()
        }catch(e){
        }
    }
    
</script>
<form class="flex flex-row items-start justify-start w-full gap-4 mt-2 h-20"
     on:submit|preventDefault={(e)=> updateDescription(e)}
>
    {#if status==="EDIT"}
        <Textarea 
            rows={3}
            bind:value={description}
            color="text-zinc-400"
            class="flex-1  placeholder: text-base {status==="EDIT"?"border border-zinc-700 bg-zinc-800":"border-0 bg-inherit"}"
        />
        <Button 
            class="dark:bg-zinc-700 gap-2 dark:text-zinc-300 dark:hover:bg-zinc-800"
            type="submit" 
            size="sm"
        >
        <!-- on:click={toggle} -->
            <Edit size={20}/> Save
        </Button>
    {:else}
        <p class="flex-1 text-base">
            {description || "Add Description ..."}
        </p>
        <Button 
            class="dark:bg-zinc-700 gap-2 dark:text-zinc-300 dark:hover:bg-zinc-800"
            type="button"
            on:click={toggle} 
            size="sm"
        >
            <Edit size={20}/> Edit
        </Button>
    {/if}
</form>