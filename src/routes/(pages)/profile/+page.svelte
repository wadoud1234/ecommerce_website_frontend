<script lang="ts">
	import StarRatingBlock from '$lib/components/new/StarRatingBlock.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { user } = data;
</script>

<div>Hello {user?.name} In your profile</div>
