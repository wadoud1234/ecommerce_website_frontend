<script lang="ts">
	export let active = false;
	export let title: string;
	export let link: string;
</script>

<li>
	<a href={link} class={`text-lg font-sans ${active ? 'active' : ''}`}>{title}</a>
</li>

<style>
	/* .non-active {
		@apply no-underline;
	} */
	.active {
		@apply underline underline-offset-4;
	}
</style>
