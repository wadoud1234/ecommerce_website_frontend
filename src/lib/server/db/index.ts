import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { config } from "dotenv";
config();
const db = drizzle(
	postgres(process?.env?.NEON_PG_URL as string, {
		ssl: "require",
		max: 1,
	}),
	{
		schema,
	},
);
export default db;
