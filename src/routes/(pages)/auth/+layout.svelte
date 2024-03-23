<script lang="ts">
	import { AuthPicture } from '$lib/icons';
</script>

<div
	class="flex flex-row items-center justify-center h-full min-h-full gap-10 py-10 LoginPage min-w-96s"
>
	<div class="hidden h-full min-h-full flex-1 lg:flex">
		<img src={AuthPicture} alt="auth" class="w-full h-full min-h-full dark:opacity-50" />
	</div>
	<div class="flex flex-col items-center justify-center w-full max-w-full gap-5 lg:flex-1">
		<slot />
	</div>
</div>

<style>
	* {
		@apply transition-all duration-300;
	}
</style>
