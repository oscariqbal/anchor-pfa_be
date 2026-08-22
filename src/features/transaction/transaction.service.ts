import { prisma } from "../../lib/prisma";
import { AppError } from "../../errors/app-error"
import { CreateInput, UpdateInput } from "./transaction.schema";
import { getWalletBalance } from "../../helpers/get-wallet-balance";

// Create
export async function create(data: CreateInput, userId: number) {
  const { type, amount, note, sourceWalletId, destinationWalletId } = data;

  if (type === "INCOME") {

    if (destinationWalletId == null) {
      throw new AppError(422, "Destination wallet is required")
    }

    const destinationWallet = await prisma.wallet.findFirst({
      where: {
        userId,
        id: destinationWalletId,
      },
      select: {
        id: true
      }
    })

    if (!destinationWallet) {
      throw new AppError(404, "Destination wallet not found")
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        note,
        sourceWalletId: null,
        destinationWalletId
      }
    })

    return newTransaction

  } else if (type === "EXPENSE") {

    if (sourceWalletId == null) {
      throw new AppError(422, "Source wallet is required")
    }

    const sourceWallet = await prisma.wallet.findFirst({
      where: {
        userId,
        id: sourceWalletId
      },
      select: {
        id: true
      }
    })

    if (!sourceWallet) {
      throw new AppError(404, "Source wallet not found")
    }

    const sourceWalletBalance = await getWalletBalance(sourceWalletId)

    if (sourceWalletBalance.lessThan(amount)) {
      throw new AppError(422, "Insufficient wallet balance")
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        note,
        sourceWalletId,
        destinationWalletId: null
      }
    })

    return newTransaction

  } else if (type === "TRANSFER") {

    if (sourceWalletId == null) {
      throw new AppError(422, "Source wallet is required")
    }

    if (destinationWalletId == null) {
      throw new AppError(422, "Destination wallet is required")
    }

    if (sourceWalletId === destinationWalletId) {
      throw new AppError(409, "Source wallet and destination wallet cannot be the same")
    }

    const [sourceWallet, destinationWallet] = await Promise.all([
      prisma.wallet.findFirst({
        where: {
          userId,
          id: sourceWalletId
        },
        select: {
          id: true
        }
      }),
      prisma.wallet.findFirst({
        where: {
          userId,
          id: destinationWalletId
        },
        select: {
          id: true
        }
      })
    ])

    if (!sourceWallet) {
      throw new AppError(404, "Source wallet not found")
    }

    if (!destinationWallet) {
      throw new AppError(404, "Destination wallet not found")
    }

    const sourceWalletBalance = await getWalletBalance(sourceWalletId)
      
    if (sourceWalletBalance.lessThan(amount)) {
      throw new AppError(422, "Insufficient wallet balance")
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        note,
        sourceWalletId,
        destinationWalletId
      }
    })

    return newTransaction
  }
}

// Update
export async function update(data: UpdateInput, transactionId: number, userId: number, ) {
  if (Object.keys(data).length === 0) {
    throw new AppError(422, "At least one field is required")
  }

  const oldTransaction = await prisma.transaction.findFirst({
    where: {
      id: transactionId
    },
    select: {
      id: true,
      type: true,
      amount: true,
      note: true,
      sourceWalletId: true,
      destinationWalletId: true,
    }
  })

  if (!oldTransaction) {
    throw new AppError(404, "Transaction not found")
  }

  const effectiveTransaction = {
    type: data.type ?? oldTransaction.type,
    amount: data.amount ?? oldTransaction.amount,
    note: data.note ?? oldTransaction.note,
    sourceWalletId: data.sourceWalletId ?? oldTransaction.sourceWalletId,
    destinationWalletId: data.destinationWalletId ?? oldTransaction.destinationWalletId,
  }
  
  const { type, amount, note, sourceWalletId, destinationWalletId } = effectiveTransaction
  
  if (type === "INCOME") {

    if (destinationWalletId == null) {
      throw new AppError(422, "Destination wallet is required")
    }

    const destinationWallet = await prisma.wallet.findFirst({
      where: {
        userId,
        id: destinationWalletId,
      },
      select: {
        id: true
      }
    })

    if (!destinationWallet) {
      throw new AppError(404, "Destination wallet not found")
    }

    const newTransaction = await prisma.transaction.update({
      where: {
        id: transactionId
      },
      data: {
        type,
        amount,
        note,
        sourceWalletId: null,
        destinationWalletId
      }
    })

    return newTransaction

  } else if (type === "EXPENSE") {

    if (sourceWalletId == null) {
      throw new AppError(422, "Source wallet is required")
    }

    const sourceWallet = await prisma.wallet.findFirst({
      where: {
        userId,
        id: sourceWalletId
      },
      select: {
        id: true
      }
    })

    if (!sourceWallet) {
      throw new AppError(404, "Source wallet not found")
    }

    const sourceWalletBalance = await getWalletBalance(sourceWalletId, transactionId)

    if (sourceWalletBalance.lessThan(amount)) {
      throw new AppError(422, "Insufficient wallet balance")
    }

    const newTransaction = await prisma.transaction.update({
      where: {
        id: transactionId
      },
      data: {
        type,
        amount,
        note,
        sourceWalletId,
        destinationWalletId: null
      }
    })

    return newTransaction

  } else if (type === "TRANSFER") {

    if (sourceWalletId == null) {
      throw new AppError(422, "Source wallet is required")
    }

    if (destinationWalletId == null) {
      throw new AppError(422, "Destination wallet is required")
    }

    if (sourceWalletId === destinationWalletId) {
      throw new AppError(409, "Source wallet and destination wallet cannot be the same")
    }

    const [sourceWallet, destinationWallet] = await Promise.all([
      prisma.wallet.findFirst({
        where: {
          userId,
          id: sourceWalletId
        },
        select: {
          id: true
        }
      }),
      prisma.wallet.findFirst({
        where: {
          userId,
          id: destinationWalletId
        },
        select: {
          id: true
        }
      })
    ])

    if (!sourceWallet) {
      throw new AppError(404, "Source wallet not found")
    }

    if (!destinationWallet) {
      throw new AppError(404, "Destination wallet not found")
    }

    const sourceWalletBalance = await getWalletBalance(sourceWalletId, transactionId)
      
    if (sourceWalletBalance.lessThan(amount)) {
      throw new AppError(422, "Insufficient wallet balance")
    }

    const newTransaction = await prisma.transaction.update({
      where: {
        id: transactionId
      },
      data: {
        type,
        amount,
        note,
        sourceWalletId,
        destinationWalletId
      }
    })

    return newTransaction
  }
}