<script lang="ts">
	import { enhance } from '$app/forms';
	import { LogOut } from 'lucide-svelte';

	export let formClasses = '';
	export let buttonClasses = '';
	export let hasIcon = true;
</script>

<form action="/auth/logout" method="GET" class={` ${formClasses}`}>
	<button type="submit" class={`flex flex-row items-center ${buttonClasses}`}>
		{#if hasIcon}
			<LogOut />
		{/if}
		Logout
	</button>
</form>
