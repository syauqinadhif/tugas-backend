const express = require("express");
const {
  createItem,
  getAllItems,
  getItemById,
  editItemById,
  deleteItemById,
} = require("./item.service");
const authorizeJWT = require("../middleware/authorizeJWT");
const adminAuthorization = require("../middleware/adminAuthorization");

const router = express.Router();

// Create Item
router.post("/", adminAuthorization, async (req, res) => {
  try {
    const newItem = await createItem(req.body);
    res
      .status(201)
      .json({ message: "Item created successfully", data: newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Items
router.get("/", authorizeJWT, async (req, res) => {
  try {
    const items = await getAllItems();
    res
      .status(200)
      .json({ message: "All items fetched successfully", data: items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Item by ID
router.get("/:id", authorizeJWT, async (req, res) => {
  try {
    const item = await getItemById(parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "Item fetched by ID successfully ", data: item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit Item by ID
router.put("/:id", adminAuthorization, async (req, res) => {
  try {
    const updatedItem = await editItemById(parseInt(req.params.id), req.body);
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res
      .status(200)
      .json({ message: "Item updated successfully", data: updatedItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Item by ID
router.delete("/:id", adminAuthorization, async (req, res) => {
  try {
    const deletedItem = await deleteItemById(parseInt(req.params.id));
    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
