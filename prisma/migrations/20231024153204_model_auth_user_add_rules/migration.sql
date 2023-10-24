-- CreateEnum
CREATE TYPE "RulesAuth" AS ENUM ('member', 'adminCustomer', 'adminSuport', 'adminWallet');

-- AlterTable
ALTER TABLE "AuthUser" ADD COLUMN     "rules" "RulesAuth" NOT NULL DEFAULT 'member';
