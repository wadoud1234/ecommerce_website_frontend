import { z } from "zod";
import prisma from "$lib/server/prisma";

export async function POST({ request, locals }) {
	const userId = locals?.user?.id;
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
		console.error(e);
	}
	const updatedUser = await prisma.user.update({
		where: { id: parsingResult.userId },
		data: { avatar: parsingResult.avatar_url, avatarChangedAt: new Date() },
	});

	return new Response(JSON.stringify({ refresh: true }), {
		status: 302,
	});
}
