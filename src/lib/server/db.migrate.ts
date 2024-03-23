import { migrate } from "drizzle-orm/postgres-js/migrator";
import db from "./db";

(async () => {
	try {
		await migrate(db, { migrationsFolder: "./drizzle" }).then(() => {
			console.log("Finished");
			process.exit(0);
		});
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
})();
