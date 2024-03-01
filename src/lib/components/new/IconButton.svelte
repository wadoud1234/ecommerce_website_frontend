<script lang="ts">
	export let text: string;
	export let className: string = '';
	export let link: string = '';
	export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button {type} class={'flex flex-row items-center justify-center ' + ' ' + className}>
	{#if link}
		<a href={link} class="w-full flex flex-row items-center justify-center"><slot />{text}</a>
	{:else}
		<slot />{text}
	{/if}
</button>
