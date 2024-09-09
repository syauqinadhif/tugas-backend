const express = require("express");
const router = express.Router();
const userService = require("./user.service");

router.post("/", async (req, res) => {
  try {
    // Memanggil fungsi createUser dengan data dari request body
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser); // Mengembalikan respons dengan status 201 (Created)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // Memanggil fungsi getAllUsers untuk mengambil semua user
    const users = await userService.getAllUsers();
    res.status(200).json(users); // Mengembalikan respons dengan status 200 dan data user
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get users", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Memanggil fungsi getUserById dengan parameter id
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Mengembalikan data user dengan status 200
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get user", error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Memanggil fungsi editUserById dengan parameter id dan data dari request body
    const updatedUser = await userService.editUserById(id, req.body);
    res.status(200).json(updatedUser); // Mengembalikan user yang diperbarui
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Memanggil fungsi deleteUserById dengan parameter id
    const deletedUser = await userService.deleteUserById(id);
    res.status(200).json({ message: "User deleted", deletedUser }); // Mengembalikan user yang dihapus
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
});

module.exports = router;
