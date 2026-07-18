/*
  Warnings:

  - You are about to drop the column `due` on the `ScheduledTransaction` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Saving` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledFor` to the `ScheduledTransaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `ScheduledTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ScheduledTransactionType" AS ENUM ('INCOME', 'EXPENSE', 'TRANSFER');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TransactionType" ADD VALUE 'SAVING_ALLOCATE';
ALTER TYPE "TransactionType" ADD VALUE 'SAVING_RELEASE';

-- DropForeignKey
ALTER TABLE "ScheduledTransaction" DROP CONSTRAINT "ScheduledTransaction_sourceWalletId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_sourceWalletId_fkey";

-- AlterTable
ALTER TABLE "Saving" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ScheduledTransaction" DROP COLUMN "due",
ADD COLUMN     "scheduledFor" TIMESTAMP(3) NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "ScheduledTransactionType" NOT NULL,
ALTER COLUMN "sourceWalletId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "scheduledTransactionId" INTEGER,
ALTER COLUMN "sourceWalletId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "description" TEXT;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sourceWalletId_fkey" FOREIGN KEY ("sourceWalletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_scheduledTransactionId_fkey" FOREIGN KEY ("scheduledTransactionId") REFERENCES "ScheduledTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledTransaction" ADD CONSTRAINT "ScheduledTransaction_sourceWalletId_fkey" FOREIGN KEY ("sourceWalletId") REFERENCES "Wallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Saving" ADD CONSTRAINT "Saving_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
