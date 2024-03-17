import { generateProductSearchText } from "$lib/helpers/strings.js";
import { getUserFromLocals } from "$lib/server/auth.js";
import prisma from "$lib/server/prisma.js";
import { ZodError, z } from "zod";

export async function POST({ locals, request }) {
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
	const updatedUser = await prisma.user.update({
		where: { id: parsingResult.data.userId },
		data: {
			description: parsingResult.data.description,
			searchText: generateProductSearchText(
				userName,
				parsingResult.data.description,
			),
		},
	});

	return new Response(null, {
		status: 302,
		headers: {
			location: "/profile",
		},
	});
}
