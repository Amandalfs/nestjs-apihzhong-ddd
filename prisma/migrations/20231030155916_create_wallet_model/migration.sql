-- CreateEnum
CREATE TYPE "TypeAcount" AS ENUM ('poupanca', 'corrente', 'empresarial');

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "agency_id" TEXT NOT NULL,
    "typeAccount" "TypeAcount" NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "limitWithdraw" DOUBLE PRECISION NOT NULL,
    "LimitWithdrawByDaily" DOUBLE PRECISION NOT NULL,
    "currentWithdrawByDaily" DOUBLE PRECISION NOT NULL,
    "dateWithdrawByDaily" TIMESTAMP(3) NOT NULL,
    "limitSending" DOUBLE PRECISION NOT NULL,
    "LimitSendingByDaily" DOUBLE PRECISION NOT NULL,
    "currentSendingByDaily" DOUBLE PRECISION NOT NULL,
    "dateSendingByDaily" TIMESTAMP(3) NOT NULL,
    "keyCpf" TEXT NOT NULL,
    "keyEmail" TEXT NOT NULL,
    "keyRandom" TEXT NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_keyCpf_key" ON "Wallet"("keyCpf");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_keyEmail_key" ON "Wallet"("keyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_keyRandom_key" ON "Wallet"("keyRandom");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_agency_id_fkey" FOREIGN KEY ("agency_id") REFERENCES "Agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
