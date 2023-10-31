-- AlterTable
ALTER TABLE "Wallet" ALTER COLUMN "dateWithdrawByDaily" DROP NOT NULL,
ALTER COLUMN "dateSendingByDaily" DROP NOT NULL;
