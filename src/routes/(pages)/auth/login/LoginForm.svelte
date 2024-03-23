<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import AuthForm from '$lib/components/new/AuthForm.svelte';

	import { GithubLogo } from '$lib/icons';
	import IconButton from '$lib/components/new/IconButton.svelte';
	import { loginSchema, type loginSchemaType } from './LoginSchema';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import RequiredInput from '$lib/components/new/RequiredInput.svelte';

	export let data: SuperValidated<Infer<loginSchemaType>>;

	const form = superForm(data, {
		validators: zodClient(loginSchema)
	});

	const { form: formData, message } = form;

	const errorClasses = 'dark:text-red-500';
	const labelClasses = 'dark:data-[fs-error]:text-red-500';
</script>

<AuthForm {message} header="Login" description="Enter your details below to login">
	<div slot="fields" class="flex flex-col w-full gap-2">
		<Form.Field {form} name="email" class="w-full">
			<Form.Control let:attrs>
				<Form.Label class={labelClasses}>Email <RequiredInput /></Form.Label>
				<Input
					autofocus
					max="50"
					required
					min="8"
					{...attrs}
					type="email"
					class="bg-inherit border-inherit"
					bind:value={$formData.email}
				/>
			</Form.Control>
			<Form.FieldErrors {errorClasses} />
		</Form.Field>
		<Form.Field {form} name="password" class="w-full ">
			<Form.Control let:attrs>
				<Form.Label class={labelClasses}>Password <RequiredInput /></Form.Label>
				<Input
					required
					min="8"
					max="50"
					class="bg-inherit border-inherit"
					{...attrs}
					type="password"
					bind:value={$formData.password}
				/>
			</Form.Control>
			<Form.FieldErrors {errorClasses} />
		</Form.Field>
	</div>
	<div slot="submit_button" class="flex justify-start w-full">
		<Form.Button  class="w-full font-medium">Submit</Form.Button>
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
			Don't have Account yet ?
			<a href="/auth/register" class="underline underline-offset-2 underline-black">Register</a>
		</p>
	</svelte:fragment>
</AuthForm>
