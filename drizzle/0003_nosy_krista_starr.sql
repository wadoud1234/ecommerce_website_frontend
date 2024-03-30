ALTER TABLE "user" DROP CONSTRAINT "user_slug_unique";--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "description" SET DATA TYPE text;