<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let enhance: any={};
	export let message: Writable<unknown>;
	export let header: string;
	export let description: string;
</script>

<form method="POST" use:enhance class="w-full max-w-[340px] gap-5 flex flex-col items-center">
	<div
		class="flex flex-col gap-5 justify-center items-center lg:justify-start lg:items-start min-w-full"
	>
		<h2 class="text-5xl font-medium">{header}</h2>
		<p>{description}</p>
		{#if $message}
			<p class="text-red-500 font-medium">
				<span class="underline underline-red-500">Error</span> : {$message}
			</p>
		{/if}
	</div>
	<slot name="fields" />
	<slot name="submit_button" />
</form>
<slot name="extra" />
<!-- {#if dev}
	<SuperDebug theme="vscode" data={formData} label="Login Form Data" />
{/if} -->
