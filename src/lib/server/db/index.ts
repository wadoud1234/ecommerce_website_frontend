import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
const db = drizzle(
	postgres(
		"postgresql://wadoud1234:I7berLv9EfOg@ep-shiny-wave-a2y8q9fd.eu-central-1.aws.neon.tech/ecommerce_db",
		{ ssl: "require", max: 1 },
	),
	{ schema },
);
export default db;
