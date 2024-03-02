<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import SuperDebug, { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { get } from 'svelte/store';
	import { RegisterSchema, type RegisterSchemaType } from './RegisterSchema';

	export let data: SuperValidated<Infer<RegisterSchemaType>>;

	const form = superForm(data, {
		validators: zodClient(RegisterSchema),
		scrollToError: 'smooth'
	});

	const { form: formData, enhance, errors, allErrors, message } = form;
	$: console.log(get(message));
	const errorClasses = 'dark:text-red-500';
	const labelClasses = 'dark:data-[fs-error]:text-red-500';
</script>

<form method="POST" class="w-full max-w-[340px] gap-5 flex flex-col items-center">
	<div
		class="flex flex-col gap-5 justify-center items-center lg:justify-start lg:items-start min-w-full"
	>
		<h2 class="text-5xl font-medium">Register</h2>
		<p>Enter your details below</p>
		{#if $message}
			<p class="text-red-500 font-medium">
				<span class="underline underline-red-500">Error</span> : {$message}
			</p>
		{/if}
	</div>
	<Form.Field {form} name="name" class="w-full">
		<Form.Control let:attrs>
			<Form.Label class={labelClasses}>Name</Form.Label>
			<Input {...attrs} type="text" bind:value={$formData.name} />
		</Form.Control>
		<!-- <Form.Description>This is your public display name.</Form.Description> -->
		<Form.FieldErrors {errorClasses} />
	</Form.Field>
	<Form.Field {form} name="email" class="w-full">
		<Form.Control let:attrs>
			<Form.Label class={labelClasses}>Email</Form.Label>
			<Input {...attrs} type="email" bind:value={$formData.email} />
		</Form.Control>
		<!-- <Form.Description>This is your public display name.</Form.Description> -->
		<Form.FieldErrors {errorClasses} />
	</Form.Field>
	<Form.Field {form} name="password" class="w-full ">
		<Form.Control let:attrs>
			<Form.Label class={labelClasses}>Password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.password} />
		</Form.Control>
		<!-- <Form.Description>This is your public display name.</Form.Description> -->
		<Form.FieldErrors {errorClasses} />
	</Form.Field>
	<Form.Field {form} name="confirm_password" class="w-full">
		<Form.Control let:attrs>
			<Form.Label class={labelClasses}>Confirm Password</Form.Label>
			<Input {...attrs} type="password" bind:value={$formData.confirm_password} />
		</Form.Control>
		<!-- <Form.Description>This is your public display name.</Form.Description> -->
		<Form.FieldErrors {errorClasses} />
	</Form.Field>
	<div class="w-full flex justify-start"><Form.Button>Submit</Form.Button></div>
</form>
<SuperDebug data={formData} label="Register Form Data" />
