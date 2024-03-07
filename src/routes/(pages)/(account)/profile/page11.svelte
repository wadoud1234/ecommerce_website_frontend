<!-- <script>
	import AccountForm from '$lib/components/new/AccountForm.svelte';
	import ProfileNavMenu from '$lib/components/new/ProfileNavMenu.svelte';
	import * as Form from '$lib/components/ui/form';
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
</script>

<div class="ProfilePage flex flex-row justify-start items-start gap-5 w-full">
	<div
		class="flex flex-col items-center justify-start gap-5 min-w-48 w-fit bg-orange-500 py-6 px-2"
	>
		<div class="w-full h-[160px] bg-green-700">Image</div>
		<ProfileNavMenu />
	</div>
	<AccountForm title="Edit your profile" enhance={null}>
		<div slot="fields" class="w-full flex flex-col">
			<div class="flex flex-row items-center">
				<Form.Field {form} name="email" class="w-full">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input
							required
							min="8"
							{...attrs}
							type="email"
							class="bg-inherit border-inherit"
							bind:value={$formData.email}
						/>
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
		</div>
	</AccountForm>
</div> -->
