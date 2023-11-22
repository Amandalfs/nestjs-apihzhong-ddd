/*
  Warnings:

  - A unique constraint covering the columns `[walletId]` on the table `AuthUser` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AuthUser" ADD COLUMN     "walletId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "AuthUser_walletId_key" ON "AuthUser"("walletId");

-- AddForeignKey
ALTER TABLE "AuthUser" ADD CONSTRAINT "AuthUser_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
