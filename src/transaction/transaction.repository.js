const { parse } = require("dotenv");
const prisma = require("../db");

async function createTransaction(userId, itemId, quantityBorrowed) {
  // buatlah fungsi createTransaction yang menerima tiga parameter, userId, itemId, dan quantityBorrowed. Fungsi ini akan memasukkan data transaksi baru ke dalam database.
  const item = await prisma.item.findUnique({
    where: { id: parseInt(itemId) },
  });

  if (item.quantity < quantityBorrowed) {
    throw new Error("Jumlah yang dipinjam melebihi stok yang tersedia");
  }

  // Buat transaksi baru
  const transaction = await prisma.transaction.create({
    data: {
      userId: parseInt(userId),
      itemId: parseInt(itemId),
      quantityBorrowed: quantityBorrowed,
      status: "BORROWED",
    },
  });

  // Update stok barang setelah transaksi
  await prisma.item.update({
    where: { id: parseInt(itemId) },
    data: { quantity: item.quantity - quantityBorrowed },
  });

  return transaction;
}

async function findTransactions() {
  // buatlah fungsi findTransactions yang tidak menerima parameter. Fungsi ini akan mengembalikan seluruh data transaksi yang ada di database.
  return await prisma.transaction.findMany({
    include: { user: true, item: true }, // Menyertakan user dan item terkait
  });
}

async function findTransactionsByUserId(userId) {
  // buatlah fungsi findTransactionsByUserId yang menerima satu parameter userId. Fungsi ini akan mengembalikan seluruh data transaksi yang dilakukan oleh user dengan id yang diberikan.
  return await prisma.transaction.findMany({
    where: { userId: parseInt(userId) },
    include: { item: true }, // Menyertakan item yang terkait
  });
}

async function findTransactionById(id) {
  // buatlah fungsi findTransactionById yang menerima satu parameter id. Fungsi ini akan
  return await prisma.transaction.findUnique({
    where: { id: parseInt(id) },
    include: { user: true, item: true }, // Menyertakan user dan item terkait
  });
}

async function updateTransactionStatus(transactionId, status, timeStampField) {
  // buatlah fungsi updateTransactionStatus yang menerima tiga parameter, transactionId, status, dan timeStampField. Fungsi ini akan mengubah status transaksi berdasarkan transactionId yang diberikan.
  const updatedTransaction = await prisma.transaction.update({
    where: { id: parseInt(transactionId) },
    data: {
      status,
      [timeStampField]: status === "RETURNED" ? new Date() : null,
    },
  });

  // Update stok barang jika status diubah menjadi RETURNED
  if (status === "RETURNED") {
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(transactionId) },
    });

    await prisma.item.update({
      where: { id: transaction.itemId },
      data: { quantity: { increment: transaction.quantityBorrowed } },
    });
  }

  return updatedTransaction;
}

module.exports = {
  createTransaction,
  findTransactions,
  findTransactionsByUserId,
  findTransactionById,
  updateTransactionStatus,
};
