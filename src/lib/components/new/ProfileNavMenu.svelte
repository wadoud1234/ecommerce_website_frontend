<div class="ProfileNavMenu flex flex-col gap-2.5">
	<div class="listParent">
		<h3>Manage My Account</h3>
		<ul>
			<li>My profile</li>
			<li>Address Book</li>
			<li>My payment Options</li>
		</ul>
	</div>
	<div class="listParent">
		<h3>My Orders</h3>
		<ul>
			<li>My returns</li>
			<li>My collections</li>
		</ul>
	</div>
	<div class="listParent">
		<h3>My WishList</h3>
	</div>
</div>

<style>
	h3 {
		@apply text-[16px] font-medium text-black;
	}
	.listParent {
		@apply flex flex-col gap-2 text-zinc-500;
	}
	ul {
		@apply flex flex-col gap-1 pl-8 text-[15px];
	}
	ul li {
		@apply cursor-pointer;
	}
</style>
