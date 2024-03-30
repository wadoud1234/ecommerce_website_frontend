import { OAuth2RequestError } from "arctic";
import { github, auth } from "$lib/server/auth";
import { userModel } from "$lib/server/db/schema";
import type { RequestEvent } from "@sveltejs/kit";
import { generateProductSearchText, generateSlug } from "$lib/helpers/strings";
import db from "$lib/server/db";
import { and, eq } from "drizzle-orm";

export async function GET({ url, cookies }: RequestEvent): Promise<Response> {
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies.get("github_oauth_state") ?? null;

	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const { avatar_url } = githubUser;

		const existingUser = await db.query.userModel.findFirst({
			where: and(
				eq(userModel.provider, "github"),
				eq(userModel.providerId, `${githubUser.id}`),
			),
		});

		if (existingUser) {
			const session = await auth.createSession(existingUser.id, {});
			const sessionCookie = auth.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: ".",
				...sessionCookie.attributes,
			});
		} else {
			const githubEmailResponse = await fetch(
				"https://api.github.com/user/emails",
				{
					headers: {
						Authorization: `Bearer ${tokens.accessToken}`,
					},
				},
			);
			const primary = (await githubEmailResponse.json()).find(
				(email: GithubEmail) => email.primary,
			);

			if (primary) {
				const newUser = await db
					.insert(userModel)
					.values({
						provider: "github",
						providerId: `${githubUser.id}`,
						name: githubUser.login,
						slug: generateSlug(githubUser.name),
						searchText: generateProductSearchText(githubUser.name, ""),
						email: primary.email,
						isAdmin: false,
						avatar: avatar_url,
						password: "",
					})
					.returning({ id: userModel.id })
					.then((data) => data?.[0]);

				const session = await auth.createSession(newUser.id, {});
				const sessionCookie = auth.createSessionCookie(session.id);
				cookies.set(sessionCookie.name, sessionCookie.value, {
					path: ".",
					...sessionCookie.attributes,
				});
			}
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/",
			},
		});
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
}
interface GitHubUser {
	id: number;
	login: string;
	avatar_url: string;
	name: string;
}

interface GithubEmail {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
}
