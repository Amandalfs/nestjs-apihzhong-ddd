-- CreateTable
CREATE TABLE "Extract" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "walletId" TEXT NOT NULL,

    CONSTRAINT "Extract_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extract" ADD CONSTRAINT "Extract_walletId_fkey" FOREIGN KEY ("walletId") REFERENCES "Wallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
