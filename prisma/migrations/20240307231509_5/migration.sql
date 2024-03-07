/*
  Warnings:

  - Added the required column `provider` to the `UserLinks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PROVIDERS" AS ENUM ('GOOGLE', 'FACEBOOK', 'INSTAGRAM', 'WHATS_UP', 'APPLE', 'ALI_BABA', 'ALI_EXPRESS', 'TWITTER', 'GITHUB', 'PERSONAL');

-- AlterTable
ALTER TABLE "UserLinks" ADD COLUMN     "provider" "Provider" NOT NULL;
