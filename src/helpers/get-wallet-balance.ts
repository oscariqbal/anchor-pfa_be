import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export async function getWalletBalance(walletId: number) {
  const walletIncome = await prisma.transaction.aggregate({
    _sum: {
      amount: true
    },
    where: {
      destinationWalletId: walletId,
      type: "INCOME"
    },
  })

  const walletTransferIncome = await prisma.transaction.aggregate({
    _sum: {
      amount: true
    },
    where: {
      destinationWalletId: walletId,
      type: "TRANSFER"
    },
  })

  const walletExpense = await prisma.transaction.aggregate({
    _sum: {
      amount: true
    },
    where: {
      sourceWalletId: walletId,
      type: "EXPENSE"
    },
  })

  const walletTransferExpense = await prisma.transaction.aggregate({
    _sum: {
      amount: true
    },
    where: {
      sourceWalletId: walletId,
      type: "TRANSFER"
    },
  })

  const walletBalance = 
  (walletIncome._sum.amount ?? new Prisma.Decimal(0))
  .plus
  (walletTransferIncome._sum.amount ?? new Prisma.Decimal(0))
  .sub
  (walletExpense._sum.amount ?? new Prisma.Decimal(0))
  .sub
  (walletTransferExpense._sum.amount ?? new Prisma.Decimal(0))

  return walletBalance
}