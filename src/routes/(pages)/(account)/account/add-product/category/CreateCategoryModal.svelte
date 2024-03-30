<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import axios, { AxiosError } from 'axios';
	import { string, unknown } from 'zod';
	import createCategorySchema from './createCategorySchema';
	import toast from 'svelte-french-toast';
	import { goto, invalidate, invalidateAll, replaceState } from '$app/navigation';
	import { closeCreateCategoryModal } from './CategoryModalStore';
	let categoryName: string = '';
	export let onClose: () => void;
	let error: string = '';
	const handleFormSubmit = async (e: Event) => {
		const target = e?.target as HTMLFormElement;
		const input = target.name as unknown as HTMLInputElement;
		const categoryValue = input.value;
		console.log({ categoryValue });
		const results = createCategorySchema.safeParse(categoryName.trim());
		if (!results.success) {
			error = results.error.formErrors.formErrors[0];
			toast.error(error);
		} else {
			try {
				const response = await axios
					.post('/account/add-product/category', {
						categoryName: categoryName.trim()
					})
					.then((res) => {
						console.log(res);
						return res;
					});
				if (response.data === 'Created') {
					toast.success('Category created successfully');
					input.value = '';
					error = '';
					onClose();
					toast.success('Reloading ...');
					window.location.reload();
				}
				console.log({ response });
			} catch (error: any) {
				const responseData = error.response.data as string;
				toast.error(responseData);
			}
		}
	};
</script>

<form on:submit={handleFormSubmit} class="grid gap-4 py-4">
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="name" class="text-right {error ? 'text-red-500' : ''}">Name</Label>
		<Input
			id="name"
			bind:value={categoryName}
			min={5}
			required
			max={50}
			type="text"
			class="{error ? 'border-red-500' : ''} col-span-3"
		/>
	</div>
	<button>Submit</button>
	<!-- <div class="grid grid-cols-4 items-center gap-4">
        <Label for="username" class="text-right">Username</Label>
        <Input id="username" value="@peduarte" class="col-span-3" />
    </div> -->
</form>
