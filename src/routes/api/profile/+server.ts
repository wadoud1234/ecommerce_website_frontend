import { z } from "zod";
import prisma from "$lib/server/prisma";
import { getUserFromLocals } from "$lib/server/auth.js";

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
	const lastUser = await prisma.user.findUnique({
		where: { id: parsingResult.data.userId },
		select: { avatar: true },
	});
	const updatedUser = await prisma.user.update({
		where: { id: parsingResult.data.userId },
		data: { avatar: parsingResult.data.avatar_url },
	});

	return new Response(null, {
		status: 302,
	});
}
