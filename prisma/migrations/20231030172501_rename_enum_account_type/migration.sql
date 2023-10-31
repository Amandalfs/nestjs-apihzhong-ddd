/*
  Warnings:

  - Changed the type of `typeAccount` on the `Wallet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TypeAccount" AS ENUM ('poupanca', 'corrente', 'empresarial');

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "typeAccount",
ADD COLUMN     "typeAccount" "TypeAccount" NOT NULL;

-- DropEnum
DROP TYPE "TypeAcount";
