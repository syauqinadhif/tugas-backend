const prisma = require("../db");

async function insertItem(itemData) {
  try {
    const newItem = await prisma.item.create({
      data: itemData,
    });
    return newItem;
  } catch (error) {
    throw new Error('Error inserting item: ' + error.message);
  }
}

async function findItems() {
  try {
    const items = await prisma.item.findMany();
    return items;
  } catch (error) {
    throw new Error('Error fetching items: ' + error.message);
  }
}

async function findItemById(id) {
  try {
    const item = await prisma.item.findUnique({
      where: { id: id },
    });
    return item;
  } catch (error) {
    throw new Error('Error fetching item by ID: ' + error.message);
  }
}

async function editItem(id, itemData) {
  try {
    const updatedItem = await prisma.item.update({
      where: { id: id },
      data: itemData,
    });
    return updatedItem;
  } catch (error) {
    throw new Error('Error updating item: ' + error.message);
  }
}

async function deleteItem(id) {
  try {
    const deletedItem = await prisma.item.delete({
      where: { id: id },
    });
    return deletedItem;
  } catch (error) {
    throw new Error('Error deleting item: ' + error.message);
  }
}

async function updateItemQuantity(itemId, newQuantity) {
  try {
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: { quantity: newQuantity },
    });
    return updatedItem;
  } catch (error) {
    throw new Error('Error updating item quantity: ' + error.message);
  }
}

module.exports = {
  insertItem,
  findItems,
  findItemById,
  editItem,
  deleteItem,
  updateItemQuantity,
};
