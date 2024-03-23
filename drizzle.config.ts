import type { Config } from "drizzle-kit";

const drizzleConfig: Config = {
	schema: "./src/lib/server/db/schema.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		host: process.env.NEON_PG_HOST as string,
		user: process.env.NEON_PG_USER as string,
		password: process.env.NEON_PG_PASSWORD as string,
		database: process.env.NEON_PG_DATABASE as string,
	},
};
export default drizzleConfig;
