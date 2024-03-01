-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GITHUB', 'EMAIL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'EMAIL';
