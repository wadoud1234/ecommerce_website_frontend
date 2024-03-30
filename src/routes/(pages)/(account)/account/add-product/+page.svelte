<!-- <script lang="ts">
    import * as Form from "$lib/components/ui/form"
    import Input from "$lib/components/ui/input/input.svelte"
    import Button from "$lib/components/ui/button/button.svelte";
	import { superForm, type Infer, type SuperValidated } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import AddProductSchema from "./AddProductSchema";
	import Textarea from "$lib/components/ui/textarea/textarea.svelte";
    import {CldUploadButton , CldUploadWidget , CldImage} from "svelte-cloudinary"
	import { CategoriesData, type onUploadImageResponse } from "$lib/types";
	import { ImageUp } from "lucide-svelte";
    import * as Select from "$lib/components/ui/select";
	import AddProductImage from "$lib/components/new/Product/AddProductImage.svelte";
	import toast from "svelte-french-toast";
	import { invalidateAll, replaceState } from "$app/navigation";
	import { page } from "$app/stores";
	import AddMainProductImage from "$lib/components/new/Product/AddMainProductImage.svelte";

    export let data: SuperValidated<Infer<typeof AddProductSchema>>;

    const form = superForm(data, {
        validators: zodClient(AddProductSchema),
        scrollToError: 'smooth',
        dataType:"json"
        
        
    });
    let productImages :string[] =["ecommerce_products/mrc1hyomez4fdsw3a1rc","ecommerce_products/mrc1hyomez4fdsw3a1rc","ecommerce_products/mrc1hyomez4fdsw3a1rc","ecommerce_products/mrc1hyomez4fdsw3a1rc"] || new Array<string>()

    const { form: formData,message,enhance,errors,allErrors} = form;
    $:console.log({$allErrors,$errors});
    
    const handlePriceInput = (e:Event)=>{
        const target = e?.target as HTMLInputElement
        if(target?.value){
            $formData.price = +target.value 
        }
    }
    const handleQuantityInput = (e:Event)=>{
        const target = e?.target as HTMLInputElement
        if(target?.value){
            $formData.quantity = +target.value 
        }
    }
    $:console.log({productImages});
    
    const errorClasses = 'dark:text-red-500';
	const labelClasses = 'dark:data-[fs-error]:text-red-500';
    const onUpload = (results:onUploadImageResponse)=>{
        productImages[productImages.length<0?0:productImages.length] = results.info.public_id 
    }
    $: selectedCategory = $formData.category ? {
        label: $formData.category,
        value: $formData.category
    }: undefined;
</script>
-->
<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { PageServerData } from './$types';
	import { AddProductSchemaFront, isBlob, isString } from './AddProductZodSchema';
	import { page } from '$app/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import toast from 'svelte-french-toast';
	import { Description } from '$lib/components/ui/form';
	import { z } from 'zod';
	import {
		categorySchema,
		descriptionSchema,
		inputValidator,
		nameSchema,
		priceSchema,
		quantitySchema
	} from './validators';
	import RequiredInput from '$lib/components/new/RequiredInput.svelte';
	let productImages: string[] = new Array<string>();
	let productEnteredData = {
		name: '',
		description: '',
		price: 0,
		quantity: 0,
		category: '',
		images: new Array<File>()
	};
	let errors = {
		name: new Array<string>(),
		description: new Array<string>(),
		price: new Array<string>(),
		quantity: new Array<string>(),
		category: new Array<string>(),
		images: new Array<string>(),
		general: new Array<string>()
	};
	let loading: boolean = false;
	const onSubmit = async (e: Event) => {
		loading = true;
		console.log({ images: productEnteredData.images });
		const results = AddProductSchemaFront.safeParse(productEnteredData);
		console.log({ results });

		if (results?.success) {
			const formdata = new FormData();
			formdata.append('name', results.data.name);
			formdata.append('description', results.data.description);
			formdata.append('price', results.data.price.toString());
			formdata.append('quantity', results.data.quantity.toString());
			formdata.append('category', results.data.category);
			results.data.images.forEach((image, i) => {
				if (image && (isBlob(image) || isString(image))) {
					formdata.append(`image${i}`, image);
				}
			});
			const response = await fetch('/account/add-product', {
				method: 'POST',
				body: formdata
			});
			if (response.ok) {
				const responseData = await response.json();
				toast.success('Product added successfully');
				const { productSlug } = responseData;
				goto(`/products/${productSlug}`, {
					replaceState: true,
					invalidateAll: true
				});
			} else {
				toast('Something wrong happend , Refreshing ...');
				const responseData = await response.json();
				errors = {
					name: responseData?.name || new Array<string>(),
					description: responseData?.description || new Array<string>(),
					price: responseData?.price || new Array<string>(),
					quantity: responseData?.quantity || new Array<string>(),
					category: responseData?.category || new Array<string>(),
					images: responseData?.images || new Array<string>(),
					general: responseData?.general || new Array<string>()
				};
			}
			console.log({ response });
		} else {
			const { error } = results;
			const { fieldErrors, formErrors } = error.formErrors;
			console.log({ flatten: error.flatten() });

			console.log({ fieldErrors, formErrors });

			errors = {
				name: fieldErrors?.name || new Array<string>(),
				description: fieldErrors?.description || new Array<string>(),
				price: fieldErrors?.price || new Array<string>(),
				quantity: fieldErrors?.quantity || new Array<string>(),
				category: fieldErrors?.category || new Array<string>(),
				images: fieldErrors?.images || new Array<string>(),
				general: formErrors?.length > 0 ? formErrors : new Array<string>()
			};
		}
		loading = false;
	};
	export let data: PageServerData;
	const { categories } = data;

	let previewImages: string[] = new Array<string>();
	$: console.log({ previewImages });
	const onUpload = (e: Event, i: number) => {
		const target = e?.target as HTMLInputElement;
		const file = target?.files?.[0];
		if (file) {
			productEnteredData.images[i] = file;
		}

		previewImages[i] = URL.createObjectURL(file as Blob);
	};

	const labelErrorClasses = 'text-red-500';
	const descriptionErrorsClasses = 'text-red-500 text-sm w-full flex flex-col';
	const inputErrorClasses = 'border border-red-500';
	$: isThereErrors =
		errors?.name?.length > 0 ||
		errors?.description?.length > 0 ||
		errors?.price?.length > 0 ||
		errors?.quantity?.length > 0 ||
		errors?.category?.length > 0 ||
		errors?.images?.length > 0 ||
		errors?.general?.length > 0;
	$: buttonDisabled = loading || isThereErrors;
	import type { Snapshot } from './$types';
	import type { Selected } from 'bits-ui';
	import { BadgePlus, BadgePlusIcon } from 'lucide-svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import CreateCategoryModal from './category/CreateCategoryModal.svelte';
	import CategoryModalStore, {
		closeCreateCategoryModal,
		openCreateCategoryModal
	} from './category/CategoryModalStore';
	import { get } from 'svelte/store';
	import CategoryCarousel from '$lib/components/new/CategoryCarousel.svelte';
	import CategoryCombobox from '$lib/components/new/Product/CategoryCombobox.svelte';

	export const snapshot: Snapshot<typeof productEnteredData> = {
		capture: () => productEnteredData,
		restore: (value) => {
			productEnteredData = value;
		}
	};

	const handleNameInput = (e: Event) => {
		const target = e?.target as HTMLInputElement;
		const value = target?.value;
		errors.name = inputValidator(value?.trim() || '', errors, 'name', nameSchema);
	};
	const handleDescriptionInput = (e: Event) => {
		const target = e?.target as HTMLInputElement;
		const value = target?.value;
		errors.description = inputValidator(
			value?.trim() || '',
			errors,
			'description',
			descriptionSchema
		);
	};
	const handlePriceInput = (e: Event) => {
		const target = e?.target as HTMLInputElement;
		const value = target?.value;
		const inputValue = Number(value) || 1;
		productEnteredData.price = inputValue;
		errors.price = inputValidator(inputValue, errors, 'price', priceSchema);
	};
	const handleQuantityInput = (e: Event) => {
		const target = e?.target as HTMLInputElement;
		const value = target?.value;
		const inputValue = Number(value) || 1;
		productEnteredData.quantity = inputValue;
		errors.quantity = inputValidator(inputValue, errors, 'quantity', quantitySchema);
	};
	const handleCategoryChange = (e: Selected<string> | undefined) => {
		if (e) {
			const { value } = e;
			productEnteredData.category = String(value) || '';

			errors.category = inputValidator(value ? value : '', errors, 'category', categorySchema);
			errors = { ...errors, general: errors?.general?.filter((e) => e !== 'Category is required') };
		}
	};
	const handleCategoryErrorRemove = () => {
		errors = { ...errors, general: errors?.general?.filter((e) => e !== 'Category is required') };
	};
	$: console.log(get(CategoryModalStore));
	let openCreateCategory = false;
	$: console.log({ productEnteredData });
	const handleImageInput = (e: Event, index: number) => {
		const target = e?.target as HTMLInputElement;
		const file = target?.files?.[0];
		if (file) {
			productEnteredData.images[index] = file;
		}
		console.log('Uploaded', { file });
		errors.images = [];
		errors = { ...errors, general: errors?.general?.filter((e) => e !== 'Images are required') };
		errors = errors;
	};
</script>

<svelte:head>
	<title>Add Product</title>
</svelte:head>
<div
	class="flex flex-col items-start justify-start w-full h-full max-w-full max-h-full min-w-full min-h-full gap-4"
>
	<h1 class="text-3xl font-medium">Add Product</h1>
	{#if errors?.general?.length > 0}
		{#each errors.general as error}
			<p class="text-red-500">{error}</p>
		{/each}
	{/if}
	<form
		on:submit={onSubmit}
		class="flex flex-row items-start justify-start w-full min-h-full gap-10"
	>
		<!--LEFT -->
		<div
			class="lg:max-w-[50%] flex flex-col items-start justify-between flex-1 h-full min-h-full gap-4"
		>
			<div class="flex flex-col w-full gap-1">
				<Label class={`text-base ${errors?.name?.length > 0 ? labelErrorClasses : ''}`}
					>Name <RequiredInput /></Label
				>
				<Input
					class={` ${errors?.name.length > 0 ? inputErrorClasses : ''}`}
					placeholder="Product Name"
					type="text"
					bind:value={productEnteredData.name}
					on:input={handleNameInput}
				/>
				{#if errors?.name?.length > 0}
					<p class={descriptionErrorsClasses}>
						{#each errors.name as error}
							<span>{error}</span>
						{/each}
					</p>
				{/if}
			</div>

			<div class="flex flex-col w-full gap-1">
				<Label
					class={`text-base poppins-medium ${errors?.description?.length > 0 ? labelErrorClasses : ''}`}
					>Description</Label
				>
				<Textarea
					class={`resize-none ${errors?.description?.length > 0 ? inputErrorClasses : ''}`}
					rows={5}
					placeholder="Product Description"
					bind:value={productEnteredData.description}
					on:input={handleDescriptionInput}
				/>
				{#if errors?.description?.length > 0}
					<p class={descriptionErrorsClasses}>
						{#each errors.description as error}
							<span>{error}</span>
						{/each}
					</p>
				{/if}
			</div>

			<div class="flex flex-col w-full gap-1">
				<Label
					class={`text-base poppins-medium ${errors?.price?.length > 0 ? labelErrorClasses : ''}`}
					>Price <RequiredInput /></Label
				>
				<Input
					class={`${errors?.price?.length > 0 ? inputErrorClasses : ''}`}
					type="number"
					step={0.01}
					placeholder="Product Price"
					on:input={handlePriceInput}
					bind:value={productEnteredData.price}
				/>
				{#if errors?.price?.length > 0}
					<p class={descriptionErrorsClasses}>
						{#each errors.price as error}
							<span>{error}</span>
						{/each}
					</p>
				{/if}
			</div>

			<div class="flex flex-col w-full gap-1">
				<Label
					class={`text-base poppins-medium ${errors?.quantity?.length > 0 ? labelErrorClasses : ''}`}
					>Quantity <RequiredInput /></Label
				>
				<Input
					class={`${errors?.quantity?.length > 0 ? inputErrorClasses : ''}`}
					placeholder="Product Quantity"
					type="number"
					on:input={handleQuantityInput}
					bind:value={productEnteredData.quantity}
				/>
				{#if errors?.quantity?.length > 0}
					<p class={descriptionErrorsClasses}>
						{#each errors.quantity as error}
							<span>{error}</span>
						{/each}
					</p>
				{/if}
			</div>
			<div class="flex flex-col items-start w-full gap-4">
				<div class="flex flex-col w-full gap-1">
					<Label
						class={`text-base poppins-medium ${errors?.category?.length > 0 ? labelErrorClasses : ''}`}
						>Select Category <RequiredInput /></Label
					>
					<!-- <Select.Root multiple={false} name="category" onSelectedChange={handleCategoryChange}>
						<Select.Trigger
							value={productEnteredData.category}
							class={errors?.category?.length > 0 ? inputErrorClasses : ''}
						>
							<Select.Value
								on:change={(e) => console.log('ValueChange', { e, target: e.target })}
								placeholder={productEnteredData.category || 'Category'}
							/>
						</Select.Trigger>
						<Select.Content>
							{#each categories as { name, slug }}
								<Select.Item value={slug} placeholder={name} />
							{/each}
						</Select.Content>
					</Select.Root> -->
					<CategoryCombobox
						{handleCategoryErrorRemove}
						categories={data.categories}
						bind:selectedCategory={productEnteredData.category}
					/>
					{#if errors?.category?.length > 0}
						<p class={descriptionErrorsClasses}>
							{#each errors.category as error}
								<span>{error}</span>
							{/each}
						</p>
					{/if}
				</div>
				<div class="flex flex-col w-full gap-1">
					<!-- <Label class="text-base">Or Create One</Label> -->
					<!-- <Input placeholder="Category Name" type="text" /> -->
					<p class="mt-1">Or create new category</p>
					<Dialog.Root on:close={closeCreateCategoryModal} bind:open={openCreateCategory}>
						<Dialog.Trigger
							class={`px-0 w-fit`}
							on:click={() => {
								openCreateCategory = true;
							}}
						>
							<Button class="flex flex-row items-center gap-2 w-fit">
								<BadgePlusIcon />Create
							</Button>
						</Dialog.Trigger>
						<Dialog.Content class="sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>Create Category</Dialog.Title>
								<Dialog.Description>
									Create new category here. Click save when you're done.
								</Dialog.Description>
							</Dialog.Header>

							<CreateCategoryModal
								onClose={() => {
									openCreateCategory = false;
								}}
							/>

							<Dialog.Footer>
								<Button type="submit">Save changes</Button>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>

			<!-- {#if $message}  
                <p>{$message}</p>
            {/if} -->

			<!-- Product Name -->
			<!-- <Form.Field {form} name="name" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Name</Form.Label>
					<Input
						min="8"
						max="255"
						required
						class="border bg-inherit border-zinc-300 dark:border-zinc-800 "
						{...attrs}
						type="text"
						bind:value={$formData.name}
					/>
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field>

			<Form.Field {form} name="description" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Description</Form.Label>
					<Textarea
						rows={5}
						class="border resize-none bg-inherit border-zinc-300 dark:border-zinc-800 "
						{...attrs}
						bind:value={$formData.description}
					/>
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field>

			<Form.Field {form} name="price" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Price</Form.Label>
					<Input
						min="0"
						step="0.01"
						required
						class="border bg-inherit border-zinc-300 dark:border-zinc-800 "
						{...attrs}
						type="number"
						on:input={handlePriceInput}
						bind:value={$formData.price}
					/>
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field>

			<Form.Field {form} name="quantity" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Quantity</Form.Label>
					<Input
						min="1"
						required
						class="border bg-inherit border-zinc-300 dark:border-zinc-800 "
						{...attrs}
						type="number"
						on:input={handleQuantityInput}
						bind:value={$formData.quantity}
					/>
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field> -->

			<!-- Product Category -->
			<!-- <Form.Field {form} name="category" class="w-full">
				<Form.Control let:attrs>
					<Form.Label class={labelClasses}>Category</Form.Label>
					<Select.Root
						required
						selected={selectedCategory}
						onSelectedChange={(v) => {
							v && ($formData.category = v.value);
						}}
					>
						<Select.Trigger
							{...attrs}
							class="border bg-inherit hover:bg-zinc-200 border-zinc-300 dark:hover:bg-zinc-800 dark:border-zinc-800"
						>
							<Select.Value placeholder="Select a category" />
						</Select.Trigger>
						<Select.Content class="bg-inherit border-zinc-800 peer-hover:bg-zinc-800">
							{#each CategoriesData as { name }}
								<Select.Item value={name} label={name} class="group-hover:bg-zinc-900 bg-inherit" />
							{/each}
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.category} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors class={errorClasses} />
			</Form.Field> -->
			<!-- </div> -->

			<label for="images" hidden>Images</label>
			<input name="images" id="images" type="hidden" hidden bind:value={productImages} />
			<Button
				disabled={buttonDisabled}
				aria-label="Add product"
				type="submit"
				class="border bg-inherit text-inherit border-zinc-300 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800"
				>Add</Button
			>
		</div>
		<!-- RIGHT -->
		<div class="md:m-0 md:max-w-[50%] w-full h-full flex flex-col min-h-full justify-between gap-4">
			<!-- {#if productImages && productImages.length===4}
                <div class="flex flex-wrap items-center justify-center w-full max-w-full min-w-full gap-4">
                    <div class="imageContainer">
                        <CldImage class="imageDisplay" src={productImages[0]}/>
                    </div>
                    <div class="imageContainer">
                        <CldImage class="imageDisplay" src={productImages[1]}/>
                    </div>
                    <div class="imageContainer">
                        <CldImage class="imageDisplay " src={productImages[2]}/>
                    </div>
                    <div class="imageContainer">
                        <CldImage class="imageDisplay " src={productImages[3]}/>
                    </div>
                </div>
            {:else}
                <div class="flex flex-col items-center justify-start w-full gap-2">
                    {#if productImages.length<4}
                        <p>Remaining : {4-productImages.length}</p>
                        {:else}
                        <p>All images are uploaded</p>
                    {/if}
                    <Button class="gap-2 border rounded-md w-fit bg-zinc-200 dark:border-zinc-800 hover:bg-zinc-300 text-inherit border-zinc-300 dark:bg-zinc-800 dark:bg-inherit dark:hover:bg-zinc-800 dark:text-zinc-300">
                        <ImageUp/>
                        <CldUploadButton 
                        uploadPreset="ecommerce_products" 
                        class="rounded-md w-fit"
                        options={{maxFiles:4}}
                        {onUpload}    
                    >
                        Upload Images
                    </CldUploadButton>
                    </Button>
                    <CldUploadWidget uploadPreset='ecommerce_products' />
                </div>
            {/if} -->
			<!-- <div
				class="flex flex-col items-center justify-start w-full h-full max-w-full min-w-full gap-y-4 gap-x-10"
			> -->
			<div class="flex flex-col gap-1">
				<Label class="text-base" for="image_1">Main Image</Label>
				<Input
					name="image_1"
					id="image_1"
					type="file"
					class="cursor-pointer"
					accept="image/*"
					on:input={(e) => handleImageInput(e, 0)}
				/>
			</div>
			<div class="flex flex-col gap-1">
				<Label class="text-base" for="image_2">Thumbnail Image 1</Label>
				<Input
					name="image_2"
					id="image_2"
					type="file"
					class="cursor-pointer"
					accept="image/*"
					on:input={(e) => handleImageInput(e, 1)}
				/>
			</div>
			<div class="flex flex-col gap-1">
				<Label class="text-base" for="image_3">Thumbnail Image 2</Label>
				<Input
					name="image_3"
					id="image_3"
					type="file"
					class="cursor-pointer"
					accept="image/*"
					on:input={(e) => handleImageInput(e, 2)}
				/>
			</div>
			<div class="flex flex-col gap-1">
				<Label class="text-base" for="image_4">Thumbnail Image 3</Label>
				<Input
					name="image_4"
					id="image_4"
					type="file"
					class="cursor-pointer"
					accept="image/*"
					on:input={(e) => handleImageInput(e, 3)}
				/>
			</div>
			<img src="" alt="" />
			<!-- <AddMainProductImage
					uploadPreset="ecommerce_products"
					header="Main Pictures"
					bind:value={productImages[0]}
				/>
				<div class="flex flex-row items-center justify-center max-w-full min-w-full gap-4 h-fit">
					<AddProductImage
						uploadPreset="ecommerce_products"
						header="Picture 1"
						bind:value={productImages[1]}
					/>
					<AddProductImage
						uploadPreset="ecommerce_products"
						header="Picture 2"
						bind:value={productImages[2]}
					/>
					<AddProductImage
						uploadPreset="ecommerce_products"
						header="Picture 3"
						bind:value={productImages[3]}
					/>
				</div> -->
			<!-- </div> -->
		</div>
	</form>
	<!-- {#if hello}<img src={hello} alt="" />{/if} -->
	<!-- <AddProductImage uploadPreset="ecommerce_products" header="Picture 1"/> -->
	{#if previewImages && previewImages.length > 0}
		<h1 class="w-full text-lg font-medium text-center">Images Preview</h1>
		<div class="flex flex-row flex-wrap items-center justify-center w-full gap-4">
			{#each previewImages as image}
				{#if image}
					<img
						src={image}
						alt="product"
						width="160"
						height="160"
						class="object-cover object-center w-40 h-40 max-w-40 max-h-40 rounded-xl"
					/>
				{:else}
					<div class="w-40 h-40 max-w-40 max-h-40 rounded-xl"></div>{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	/* .imageContainer{
        @apply w-[150px] rounded-lg h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px];
    } */

	/* .imageDisplay{
        @apply rounded-lg w-[150px] h-[150px] max-w-[150px] max-h-[150px] min-w-[150px] min-h-[150px] object-center object-cover;
    } */
</style>
