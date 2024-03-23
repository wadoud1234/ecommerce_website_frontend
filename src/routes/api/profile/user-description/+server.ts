import { getUserFromLocals } from "$lib/server/auth.js";
import db from "$lib/server/db/index.js";
import { user as userModel } from "$lib/server/db/schema.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function POST({ locals, request }) {
	console.time("updateUserDescription");
	const requestData = await request.json();
	const user = getUserFromLocals(locals);
	const userId = user?.id;
	const userName = requestData.userName;
	const description = requestData.description;

	const schema = z.object({
		userId: z.string(),
		userName: z.string(),
		description: z
			.string()
			.max(400, { message: "Description must be less than 400 characters" }),
	});
	const parsingResult = schema.safeParse({ userId, description, userName });
	if (!parsingResult.success) {
		return new Response(JSON.stringify({ error: "Invalid data" }), {
			status: 400,
		});
	}
	await db
		.update(userModel)
		.set({
			description: parsingResult.data.description,
		})
		.where(eq(userModel.id, parsingResult.data.userId));
	// .returning();
	// console.log({ updatedUser: updatedUser[0] });

	// const updatedUser = await prisma.user.update({
	// where: { id: parsingResult.data.userId },
	// data: {
	// description: parsingResult.data.description,
	// searchText: generateProductSearchText(
	// userName,
	// parsingResult.data.description,
	// ),
	// },
	// });
	console.timeEnd("updateUserDescription");
	return new Response(null, {
		status: 302,
		headers: {
			location: "/account/profile",
		},
	});
}
