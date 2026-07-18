/*
  Warnings:

  - Added the required column `color` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WalletColor" AS ENUM ('BLACK', 'WHITE', 'RED', 'ORANGE', 'YELLOW', 'SPRING_GREEN', 'GREEN', 'TURQOISE', 'CYAN', 'OCEAN', 'BLUE', 'VIOLET', 'MAGENTA', 'RASPBERRY');

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "color",
ADD COLUMN     "color" "WalletColor" NOT NULL;
