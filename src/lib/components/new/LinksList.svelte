<script lang="ts">
	import type { User } from 'lucia';
	import LinkListItem from './LinkListItem.svelte';
	// export let user: User | null;
</script>

<div class="hidden md:flex flex-row items-center flex-1 justify-center">
	<ul class="flex flex-row items-center justify-around flex-1 gap-4 md:max-w-64">
		<LinkListItem title="Contact" link="/contact" />
		<LinkListItem title="About" link="/about" />
		<LinkListItem title="Products" link="/products" />
		<!-- {#if user && user.id}
			<LinkListItem title="Profile" link="/profile" />
		{:else}
			<LinkListItem title="Login" link="/auth/login" />
		{/if} -->
	</ul>
</div>
