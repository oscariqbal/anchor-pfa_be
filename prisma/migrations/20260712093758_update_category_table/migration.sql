/*
  Warnings:

  - Added the required column `color` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `color` on the `Wallet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('BLACK', 'WHITE', 'RED', 'ORANGE', 'YELLOW', 'SPRING_GREEN', 'GREEN', 'TURQUOISE', 'CYAN', 'OCEAN', 'BLUE', 'VIOLET', 'MAGENTA', 'RASPBERRY');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "color",
ADD COLUMN     "color" "Color" NOT NULL;

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "color",
ADD COLUMN     "color" "Color" NOT NULL;

-- DropEnum
DROP TYPE "WalletColor";
