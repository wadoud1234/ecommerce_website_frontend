import prisma from "$lib/server/prisma.js";
import { ZodError, z } from "zod";

export async function POST({ locals, request }) {
	const requestData = await request.json();

	const userId = locals?.user?.id;

	const description = requestData.description;

	let parsingResult: any;
	try {
		const schema = z.object({
			userId: z.string(),
			description: z
				.string()
				.max(400, { message: "Description must be less than 400 characters" }),
		});
		parsingResult = schema.parse({ userId, description });
	} catch (e: unknown) {
		const error = e as ZodError;
	}
	const updatedUser = await prisma.user.update({
		where: { id: parsingResult.userId },
		data: { description: parsingResult.description },
	});

	return new Response(null, {
		status: 302,
		headers: {
			location: "/profile",
		},
	});
}
