<script lang="ts">
	import { onMount } from 'svelte';

	let widget;
	onMount(() => {
		console.log({ cloudname: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME });

		if ('cloudinary' in window) {
			widget = window?.cloudinary?.createUploadWidget?.(
				{
					cloudname: import.meta.env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
					uploadpreset: import.meta.env.VITE_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
				},
				(uploadResult) => console.log({ uploadResult })
			);
		}
	});
	function handle() {
		if (widget) widget.open();
	}
</script>

<button on:click|preventDefault={() => {}}>UPLOAD PICTURE</button>
