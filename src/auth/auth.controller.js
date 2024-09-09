const express = require("express");
const router = express.Router();
const authService = require("./auth.service");

router.post("/register", async (req, res, next) => {
  // buatlah endpoint POST /auth/register yang akan digunakan untuk mendaftarkan user baru. Endpoint ini akan memanggil fungsi registerUser yang telah dibuat sebelumnya.
  try {
    const { username, email, password } = req.body;
    const newUser = await authService.register(username, email, password);

    res.status(201).json({
      message: "User registered succesfully!",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  // buatlah endpoint POST /auth/login yang akan digunakan untuk login. Endpoint ini akan memanggil fungsi loginUser yang telah dibuat sebelumnya.
  try {

    const { username, password } = req.body;
    const token = await authService.login(username, password);

    res.status(200).json({
      message: "Login successful!",
      token: token,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
