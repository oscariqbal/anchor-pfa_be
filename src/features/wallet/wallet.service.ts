import { AppError } from "../../errors/app-error"
import { prisma } from "../../lib/prisma";
import { CreateInput, UpdateInput } from "./wallet.schema";

// Create
export async function create(data: CreateInput, userId: number) {
  const { type, name, description } = data;

  const newWallet = await prisma.wallet.create({
    data: {
      userId,
      type,
      name,
      description,
    },
  });

  return newWallet
}

// Update
export async function update(data: UpdateInput, walletId: number, userId: number) {
  if (Object.keys(data).length === 0) {
    throw new AppError(422, "At least one field is required")
  }

  const oldWallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId,
    },
    select: {
      id: true
    }
  })

  if (!oldWallet) {
    throw new AppError(404, "Wallet not found");
  }

  const newWallet = await prisma.wallet.update({
    where: {
      id: oldWallet.id
    },
    data
  });
    
  return newWallet
}

// Delete
export async function remove(walletId: number, userId: number) {
  const wallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId, 
    },
    select: {
      id: true
    }
  })

  if (!wallet) {
    throw new AppError(404, "Wallet not found")
  }

  await prisma.wallet.delete({
    where: {
      id: walletId
    }
  })
}

// View a wallet
export async function getWallet(walletId: number, userId: number) {
  const wallet = await prisma.wallet.findUnique({
    where: {
      id: walletId,
      userId,
    },
    select: {
      id: true,
      type: true,
      name: true,
      description: true,
    },
  });

  if (!wallet) {
    throw new AppError(404, "Wallet not found");
  }

  return wallet
}

// View all wallets
export async function getAllWallet(userId: number) {
  const wallets = await prisma.wallet.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      type: true,
      name: true,
      description: true,
    }
  })

  return wallets
}