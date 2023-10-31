/*
  Warnings:

  - You are about to drop the column `agency_id` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `Wallet` table. All the data in the column will be lost.
  - Added the required column `agencyId` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_agency_id_fkey";

-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_customer_id_fkey";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "agency_id",
DROP COLUMN "customer_id",
ADD COLUMN     "agencyId" TEXT NOT NULL,
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_agencyId_fkey" FOREIGN KEY ("agencyId") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
