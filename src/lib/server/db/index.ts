import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { NEON_PG_URL } from "$env/static/private";
const db = drizzle(postgres(NEON_PG_URL, { ssl: "require", max: 1 }), {
	schema,
});
export default db;
