import { z } from "zod";
import type { RequestHandler } from "./$types";
import prisma from "$lib/server/prisma";

export async function POST({ request, params }) {
	console.log({ request, params });
	const { userId } = params;
	const requestData = await request.json();
	const { avatar_url } = requestData;
	let parsingResult: any;
	try {
		const schema = z.object({
			userId: z.string(),
			avatar_url: z.string(),
		});
		parsingResult = schema.parse({ userId, avatar_url });
	} catch (e) {
		console.log(e);
	}
	const updatedUser = await prisma.user.update({
		where: { id: parsingResult.userId },
		data: { avatar: parsingResult.avatar_url, avatarChangedAt: new Date() },
	});
	console.log({ updatedUser });

	return new Response(JSON.stringify({ refresh: true }), {
		status: 302,
	});
}
