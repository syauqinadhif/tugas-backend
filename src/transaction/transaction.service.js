const TransactionRepository = require("./transaction.repository");
const itemRepository = require("../item/item.repository");

async function borrowItem(userId, itemId, quantityBorrowed) {
  // buatlah fungsi borrowItem yang menerima tiga parameter, userId, itemId, dan quantityBorrowed. Fungsi ini akan meminjam item berdasarkan itemId yang diberikan.
  try {
    // Panggil repository untuk membuat transaksi baru
    const transaction = await TransactionRepository.createTransaction(
      userId,
      itemId,
      quantityBorrowed
    );
    return transaction;
  } catch (error) {
    // Tangani error jika diperlukan
    throw new Error(`Gagal meminjam item: ${error.message}`);
  }
}

async function getAllTransactions() {
  // buatlah fungsi getAllTransactions yang tidak menerima parameter. Fungsi ini akan mengembalikan seluruh data transaksi yang ada di database.
  try {
    // Panggil repository untuk mendapatkan seluruh transaksi
    const transactions = await TransactionRepository.findTransactions();
    return transactions;
  } catch (error) {
    // Tangani error jika diperlukan
    throw new Error(`Gagal mengambil transaksi: ${error.message}`);
  }
}

async function getTransactionsByUserId(userId) {
  // buatlah fungsi getTransactionsByUserId yang menerima satu parameter userId. Fungsi ini akan mengembalikan seluruh data transaksi yang dilakukan oleh user dengan id yang diberikan.
  try {
    // Panggil repository untuk mendapatkan transaksi berdasarkan userId
    const transactions = await TransactionRepository.findTransactionsByUserId(
      userId
    );
    return transactions;
  } catch (error) {
    // Tangani error jika diperlukan
    throw new Error(
      `Gagal mengambil transaksi untuk userId ${userId}: ${error.message}`
    );
  }
}

async function getTransactionById(transactionId) {
  // buatlah fungsi getTransactionById yang menerima satu parameter transactionId. Fungsi ini akan mengembalikan data transaksi berdasarkan id yang diberikan.
  try {
    // Panggil repository untuk mendapatkan transaksi berdasarkan id
    const transaction = await TransactionRepository.findTransactionById(
      transactionId
    );
    return transaction;
  } catch (error) {
    // Tangani error jika diperlukan
    throw new Error(
      `Gagal mengambil transaksi dengan id ${transactionId}: ${error.message}`
    );
  }
}

async function verifyTransaction(transactionId, status) {
  try {
    // Ambil transaksi dari repository berdasarkan transactionId
    const transaction = await TransactionRepository.findTransactionById(
      transactionId
    );

    // Periksa apakah transaksi ditemukan
    if (!transaction) {
      throw new Error(`Transaksi dengan ID ${transactionId} tidak ditemukan`);
    }

    // Tentukan field timestamp berdasarkan status yang diterima
    let timeStampField = null;
    if (status === "RETURNED") {
      // Jika status adalah RETURNED, set timestamp untuk kolom returnedAt
      if (transaction.status !== "BORROWED") {
        throw new Error(
          "Item hanya bisa dikembalikan jika status transaksi adalah BORROWED"
        );
      }
      timeStampField = "returnedAt";
    }

    // Panggil repository untuk memperbarui status transaksi dan field timestamp jika ada
    const updatedTransaction =
      await TransactionRepository.updateTransactionStatus(
        transactionId,
        status,
        timeStampField
      );
    return updatedTransaction;
  } catch (error) {
    // Tangani error jika terjadi masalah
    throw new Error(
      `Gagal memverifikasi transaksi dengan id ${transactionId}: ${error.message}`
    );
  }
}

async function returnItem(transactionId) {
  // buatlah fungsi returnItem yang menerima satu parameter transactionId. Fungsi ini akan mengembalikan item berdasarkan transactionId yang diberikan.
  try {
    // Verifikasi dan perbarui status transaksi menjadi RETURNED
    const transaction = await this.verifyTransaction(transactionId, "RETURNED");
    return transaction;
  } catch (error) {
    // Tangani error jika diperlukan
    throw new Error(
      `Gagal mengembalikan item untuk transaksi dengan id ${transactionId}: ${error.message}`
    );
  }
}

module.exports = {
  borrowItem,
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  verifyTransaction,
  returnItem,
};
