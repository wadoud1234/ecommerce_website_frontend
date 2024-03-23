<script lang="ts">
	import type { User } from 'lucia';
	import { UserRound } from 'lucide-svelte';
	export let user: User;
	const slug = user?.name.slice(0, 2).toUpperCase();
</script>

{#if user && user.name}
	{#if user?.avatar.length > 0}
		<img src={user.avatar} alt={slug} class="mt-1 bg-green-700 rounded-full" width="30" loading="lazy" />
	{:else}
		<div
			role="img"
			class="w-[32px] h-[32px] rounded-full bg-zinc-600 text-center flex justify-center items-center text-lg"
		>
			{slug}
		</div>
	{/if}
{:else}
	<a href="/auth/login"> <UserRound size="22" /> </a>
{/if}
