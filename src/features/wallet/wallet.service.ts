import { prisma } from "../../lib/prisma";
import { CreateInput, UpdateInput } from "./wallet.schema";

// Create
export async function create(data: CreateInput, userId: number) {
  const { type, name, description } = data;

  const wallet = await prisma.wallet.create({
    data: {
      userId,
      type,
      name,
      description,
      isArchived: false
    },
  });

  return (
    {
      data: wallet
    }
  )
}

// Update
export async function update(data: UpdateInput, walletId: number, userId: number) {
  const { type, name, description } = data;

  const oldwallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId,
      isArchived:false
    }
  })

  if (!oldwallet) {
    throw new Error("Wallet not found");
  }

  const wallet = await prisma.wallet.update({
    where: {
      id: oldwallet.id
    },
    data: {
      type,
      name,
      description,
    },
  });
    
  return (
    {
      data: wallet
    }
  )
}

// Delete
export async function remove(walletId: number, userId: number) {
  const wallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId, 
      isArchived: false
    }
  })

  if (!wallet) {
    throw new Error("Wallet not found")
  }

  await prisma.wallet.delete({
    where: {
      id: wallet.id
    }
  })
}

// View a wallet
export async function getWallet(walletId: number, userId: number) {
  const wallet = await prisma.wallet.findUnique({
    where: {
      id: walletId,
      userId,
      isArchived: false
    },
    select: {
      id: true,
      type: true,
      name: true,
      description: true,
    },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  return (
    {
      data: wallet
    }
  )
}

// View all wallets
export async function getAllWallet(userId: number) {
  const wallets = await prisma.wallet.findMany({
    where: {
      userId,
      isArchived: false
    },
    select: {
      id: true,
      type: true,
      name: true,
      description: true,
    }
  })

  if (!wallets) {
    throw new Error("Wallet not found")
  }

  return (
    {
      data: wallets
    }
  )
}

// Archive
export async function archive(walletId: number, userId: number) {
  const oldwallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId,
      isArchived: false
    }
  })

  if (!oldwallet) {
    throw new Error("Wallet not found")
  }

  const wallet = await prisma.wallet.update({
    where: {
      id: oldwallet.id
    },
    data: {
      isArchived: true
    }
  })

  return (
    {
      data: wallet
    }
  )
}

// Dearchive
export async function dearchive(walletId: number, userId: number) {
  const oldwallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId,
      isArchived: true
    }
  })

  if (!oldwallet) {
    throw new Error("Wallet not found")
  }

  const wallet = await prisma.wallet.update({
    where: {
      id: oldwallet.id
    },
    data: {
      isArchived: false
    }
  })

  return (
    {
      data: wallet
    }
  )
}