import { generateSlug } from "$lib/helpers/strings.js";
import { getUserFromLocals } from "$lib/server/auth.js";
import db from "$lib/server/db/index.js";
import { categoryModel } from "$lib/server/db/schema.js";
import { PgArray } from "drizzle-orm/pg-core";
import createCategorySchema from "./createCategorySchema.js";
import { PostgresError } from "postgres";

export async function POST({ request, locals }) {
	const user = getUserFromLocals(locals);
	if (!user || !user?.id) {
		return new Response(null, {
			status: 400,
			headers: {
				location: "/auth/login",
			},
		});
	}
	const formData = await (request.json() as Promise<{ categoryName: string }>);
	const { categoryName } = formData;

	const validationResults = createCategorySchema.safeParse(categoryName.trim());
	if (!validationResults.success) {
		const errors = validationResults.error.formErrors.fieldErrors;
		return new Response(JSON.stringify({ errors }), {
			status: 400,
		});
	}
	const name = validationResults.data;
	try {
		await db.insert(categoryModel).values({ name, slug: generateSlug(name) });
	} catch (errors) {
		console.error({ errors });

		return new Response("Something wrong happend, Try with another name", {
			status: 400,
		});
	}
	return new Response("Created", {
		status: 200,
		headers: { location: "/account/add-product" },
	});
}
