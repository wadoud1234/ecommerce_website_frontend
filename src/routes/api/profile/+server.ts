import { z } from "zod";
import { getUserFromLocals } from "$lib/server/auth.js";
import db from "$lib/server/db/index.js";
import { eq } from "drizzle-orm";
import { userModel } from "$lib/server/db/schema.js";

export async function POST({ request, locals }) {
	const user = getUserFromLocals(locals);
	if (!user || !user.id)
		return new Response(JSON.stringify({ message: "User not found" }), {
			status: 403,
		});
	const userId = user.id;
	const requestData = await request.json();
	const { avatar_url } = requestData;
	const schema = z.object({
		userId: z.string(),
		avatar_url: z.string(),
	});
	const parsingResult = schema.safeParse({ userId, avatar_url });

	if (!parsingResult.success) {
		return new Response(JSON.stringify({ error: "Invalid data" }), {
			status: 400,
		});
	}
	// const lastUser = await db.query.user.findFirst({
	// where: eq(userModel.id, parsingResult.data.userId),
	// columns: { avatar: true },
	// });

	await db
		.update(userModel)
		.set({
			avatar: parsingResult.data.avatar_url,
		})
		.where(eq(userModel.id, parsingResult.data.userId));

	return new Response("Updated", {
		status: 302,
		headers: {
			location: "/account/profile",
		},
	});
}
