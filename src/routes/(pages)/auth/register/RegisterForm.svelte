<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';

	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { RegisterSchema } from './RegisterSchema';
	import AuthForm from '$lib/components/new/AuthForm.svelte';
	import IconButton from '$lib/components/new/IconButton.svelte';
	import { GithubLogo } from '$lib/icons';
	import RequiredInput from '$lib/components/new/RequiredInput.svelte';

	export let data: SuperValidated<Infer<typeof RegisterSchema>>;

	const form = superForm(data, {
		validators: zodClient(RegisterSchema),
		scrollToError: 'smooth'
	});

	const { form: formData, message } = form;
	const errorClasses = 'dark:text-red-500';
	const labelClasses = 'dark:data-[fs-error]:text-red-500';
</script>

<AuthForm {message} header="Register" description="Enter your details below to register">
	<div slot="fields" class="flex flex-col w-full gap-2">
		<Form.Field {form} name="name" class="w-full">
			<Form.Control let:attrs>
				<Form.Label class={labelClasses}>Name <RequiredInput /></Form.Label>
				<Input
					autofocus
					min="8"
					required
					class="bg-inherit border-inherit"
					{...attrs}
					type="text"
					bind:value={$formData.name}
				/>
			</Form.Control>
			<!-- <Form.Description>This is your public display name.</Form.Description> -->
			<Form.FieldErrors {errorClasses} />
		</Form.Field>
		<Form.Field {form} name="email" class="w-full">
			<Form.Control let:attrs>
				<Form.Label class={labelClasses}>Email <RequiredInput /></Form.Label>
				<Input
					min="8"
					required
					class="bg-inherit border-inherit"
					{...attrs}
					type="email"
					bind:value={$formData.email}
				/>
			</Form.Control>
			<Form.FieldErrors {errorClasses} />
		</Form.Field>
		<Form.Field {form} name="password" class="w-full ">
			<Form.Control let:attrs>
				<Form.Label class={labelClasses}>Password <RequiredInput /></Form.Label>
				<Input
					min="8"
					required
					class="bg-inherit border-inherit"
					{...attrs}
					type="password"
					bind:value={$formData.password}
				/>
			</Form.Control>
			<Form.FieldErrors {errorClasses} />
		</Form.Field>
		<Form.Field {form} name="confirm_password" class="w-full">
			<Form.Control let:attrs>
				<Form.Label class={labelClasses}>Confirm Password <RequiredInput /></Form.Label>
				<Input
					min="8"
					required
					class="bg-inherit border-inherit"
					{...attrs}
					type="password"
					bind:value={$formData.confirm_password}
				/>
			</Form.Control>
			<Form.FieldErrors {errorClasses} />
		</Form.Field>
	</div>

	<div slot="submit_button" class="flex justify-start w-full">
		<Form.Button aria-label="Submit" class="w-full font-medium">Submit</Form.Button>
	</div>

	<svelte:fragment slot="extra">
		<IconButton
			text="Login with Github"
			link="/auth/login/github"
			className="w-full border border-black/30 bg-zinc-100/50 hover:bg-zinc-200/50 dark:bg-zinc-800 dark:hover:bg-zinc-900 p-1.5 rounded-lg gap-4 max-h-12 max-w-[340px] font-normal text-sm"
		>
			<img alt="github-login-button" src={GithubLogo} class="w-7" loading="lazy" />
		</IconButton>
		<p class="flex gap-3">
			Already have Account ?
			<a href="/auth/login" class="underline underline-offset-2 underline-black">Login</a>
		</p>
	</svelte:fragment>
</AuthForm>
