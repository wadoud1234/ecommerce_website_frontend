<script lang="ts">
	export let enhance: any;
	export let title: string;
</script>

<form action="" use:enhance class="w-full bg-red-700 px-16 py-10">
	<h1 class="text-2xl text-red-600">{title}</h1>
	<slot name="fields" />
	<slot name="submit_button" />
</form>
