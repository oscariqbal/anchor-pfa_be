import { prisma } from "../../lib/prisma";
import { CreateInput, UpdateInput } from "./wallet.schema";

// Create
export async function create(data: CreateInput, userId: number) {
  const { type, name, description } = data;

  await prisma.wallet.create({
    data: {
      userId,
      type,
      name,
      description,
    },
  });

  return {
    message: "Wallet created",
    data
  }
}

// Update
export async function update(data: UpdateInput, walletId: number, userId: number) {
  const { type, name, description } = data;

  const wallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId,
      isArchived:false
    }
  })

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  await prisma.wallet.update({
    where: {
      id: wallet.id
    },
    data: {
      type,
      name,
      description,
    },
  });
    
  return {
    message: "Wallet updated",
    data
  };
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

  return {
    message: "Wallet removed"
  }
}

// Archive
export async function archive(walletId: number, userId: number) {
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

  await prisma.wallet.update({
    where: {
      id: wallet.id
    },
    data: {
      isArchived: true
    }
  })

  return {
    message: "Wallet archived"
  }
}

// Dearchive
export async function dearchive(walletId: number, userId: number) {
  const wallet = await prisma.wallet.findFirst({
    where: {
      id: walletId,
      userId,
      isArchived: true
    }
  })

  if (!wallet) {
    throw new Error("Wallet not found")
  }

  await prisma.wallet.update({
    where: {
      id: wallet.id
    },
    data: {
      isArchived: false
    }
  })

  return {
    message: "Wallet dearchived"
  }
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
      type: true,
      name: true,
      description: true,
    },
  });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  return wallet
}

// View all wallets
export async function getAllWallet(userId: number) {
  const wallets = await prisma.wallet.findMany({
    where: {
      userId,
      isArchived: false
    },
    select: {
      type: true,
      name: true,
      description: true,
    }
  })

  if (!wallets) {
    throw new Error("Wallet not found")
  }

  return wallets
}