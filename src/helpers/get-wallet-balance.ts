import { prisma } from "../lib/prisma";
import { Prisma } from "@prisma/client";

export async function getWalletBalance(walletId: number, excludeTransactionId? : number) {

  const transactionFilter = excludeTransactionId ? {
    id: {
      not: excludeTransactionId
    }
  } : {}

  const [walletIncome, walletTransferIncome, walletExpense, walletTransferExpense] = await Promise.all([
    prisma.transaction.aggregate({
      _sum: {
        amount: true
      },
      where: {
        ...transactionFilter,
        destinationWalletId: walletId,
        type: "INCOME"
      },
    }),
    prisma.transaction.aggregate({
      _sum: {
        amount: true
      },
      where: {
        ...transactionFilter,
        destinationWalletId: walletId,
        type: "TRANSFER"
      },
    }),
    prisma.transaction.aggregate({
      _sum: {
        amount: true
      },
      where: {
        ...transactionFilter,
        sourceWalletId: walletId,
        type: "EXPENSE"
      },
    }),
    prisma.transaction.aggregate({
      _sum: {
        amount: true
      },
      where: {
        ...transactionFilter,
        sourceWalletId: walletId,
        type: "TRANSFER"
      },
    })
  ])

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