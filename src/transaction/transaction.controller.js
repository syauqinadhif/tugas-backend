const express = require("express");
const router = express.Router();
const transactionService = require("./transaction.service");
const authorizeJWT = require("../middleware/authorizeJWT");
const adminAuthorization = require("../middleware/adminAuthorization");

router.post("/borrow", authorizeJWT, async (req, res) => {
  // router.post("/borrow/:id", async (req, res) => {
  // buatlah endpoint POST /transaction/borrow yang akan digunakan untuk meminjam buku. Endpoint ini akan memanggil fungsi borrowBook yang telah dibuat sebelumnya.
  try {
    const { itemId, quantityBorrowed } = req.body;
    // const userId = req.user.id; // Mengambil userId dari token JWT
    const userId = req.params.id; // Mengambil userId dari token JWT
    const transaction = await transactionService.borrowItem(
      userId,
      itemId,
      quantityBorrowed
    );
    res.status(201).json({
      message: "Item borrowed successfully",
      transaction,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", adminAuthorization, async (req, res) => {
  // router.get("/", async (req, res) => {
  // buatlah endpoint GET /transaction yang akan digunakan untuk mengambil seluruh data transaksi. Endpoint ini akan memanggil fungsi findTransactions yang telah dibuat sebelumnya.
  try {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user/:id", authorizeJWT, async (req, res) => {
  // router.get("/user/:id", async (req, res) => {
  // buatlah endpoint GET /transaction/user yang akan digunakan untuk mengambil seluruh data transaksi yang dilakukan oleh user yang sedang login. Endpoint ini akan memanggil fungsi findUserTransactions yang telah dibuat sebelumnya.
  try {
    const userId = req.params.id; // Mengambil userId dari token JWT nanti perlu di benahi nunggu auth
    const transactions = await transactionService.getTransactionsByUserId(
      userId
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/verify/:transactionId", adminAuthorization, async (req, res) => {
  // router.patch("/verify/:transactionId", async (req, res) => {
  // buatlah endpoint PATCH /transaction/verify/:transactionId yang akan digunakan untuk memverifikasi transaksi. Endpoint ini akan memanggil fungsi verifyTransaction yang telah dibuat sebelumnya.
  try {
    const { transactionId } = req.params;
    const { status } = req.body;
    const transaction = await transactionService.verifyTransaction(
      transactionId,
      status
    );
    res.status(200).json({
      message: "Transaction verified successfully",
      transaction,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/return/:transactionId", authorizeJWT, async (req, res) => {
  // router.post("/return/:transactionId", async (req, res) => {
  // buatlah endpoint POST /transaction/return/:transactionId yang akan digunakan untuk mengembalikan buku. Endpoint ini akan memanggil fungsi returnBook yang telah dibuat sebelumnya.
  try {
    const { transactionId } = req.params;
    const transaction = await transactionService.returnItem(transactionId);
    res.status(200).json({
      message: "Item returned successfully",
      transaction,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
