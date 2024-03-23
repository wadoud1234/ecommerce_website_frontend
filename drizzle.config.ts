import type { Config } from "drizzle-kit";

const drizzleConfig: Config = {
	schema: "./src/lib/server/db/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		host: "ep-odd-darkness-a2zry3xi-pooler.eu-central-1.aws.neon.tech",
		user: "default",
		password: "MJzu8L9KwNyv",
		database: "verceldb",
	},
};
export default drizzleConfig;
