-- CreateEnum
CREATE TYPE "LinkProviders" AS ENUM ('GOOGLE', 'FACEBOOK', 'INSTAGRAM', 'WHATS_UP', 'APPLE', 'ALI_BABA', 'ALI_EXPRESS', 'TWITTER', 'GITHUB', 'PERSONAL');

-- DropIndex
DROP INDEX "Session_userId_key";

-- DropEnum
DROP TYPE "PROVIDERS";
