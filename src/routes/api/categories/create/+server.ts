import { generateSlug } from "$lib/helpers/strings.js";
import db from "$lib/server/db/index.js";
import prisma from "$lib/server/prisma.js";
import { z } from "zod";
import { category as categoryModel } from "$lib/server/db/schema.js";
export async function POST({ request }) {
	const data = await request.json();

	const { categoryName } = data;

	const schema = z.object({
		categoryName: z
			.string()
			.min(1, { message: "Category name is required" })
			.max(50, { message: "Category name must be less than 50 characters" }),
	});
	const parsingResult = schema.safeParse({ categoryName });
	if (!parsingResult.success) {
		return new Response(JSON.stringify({ error: "Invalid data" }), {
			status: 400,
		});
	}
	const category = await db.insert(categoryModel).values({
		name: parsingResult.data.categoryName,
		slug: generateSlug(parsingResult.data.categoryName),
	});
	// const category = await prisma.category.create({
	// 	data: {
	// 		name: parsingResult.data.categoryName,
	// 		slug: generateSlug(parsingResult.data.categoryName),
	// 	},
	// });
	return new Response("Created", {
		status: 200,
	});
}
