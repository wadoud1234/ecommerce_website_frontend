<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import toast from "svelte-french-toast"
	import { toggleMode ,mode} from 'mode-watcher';
	const toggle = ()=>{
		toast(`Mode changed to ${$mode==="dark"?"light":"dark"}`,{
			icon:$mode==="dark"?"☀️":"🌙",
		})
		toggleMode()
		
	}
</script>

<Button on:click={toggle} class="bg-inherit text-inherit border border-zinc-700 dark:hover:bg-zinc-600" size="icon">
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
