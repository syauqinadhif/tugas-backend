const { insertItem, findItems, findItemById, editItem, deleteItem } = require("./item.repository");

async function createItem(newItemData) {
  try {
    return await insertItem(newItemData);
  } catch (error) {
    throw new Error('Error creating item: ' + error.message);
  }
}

async function getAllItems() {
  try {
    return await findItems();
  } catch (error) {
    throw new Error('Error fetching all items: ' + error.message);
  }
}

async function getItemById(id) {
  try {
    return await findItemById(id);
  } catch (error) {
    throw new Error('Error fetching item by ID: ' + error.message);
  }
}

async function editItemById(id, itemData) {
  try {
    return await editItem(id, itemData);
  } catch (error) {
    throw new Error('Error editing item: ' + error.message);
  }
}

async function deleteItemById(id) {
  try {
    return await deleteItem(id);
  } catch (error) {
    throw new Error('Error deleting item: ' + error.message);
  }
}

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  editItemById,
  deleteItemById,
};
