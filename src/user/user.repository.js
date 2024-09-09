const prisma = require("../db");

async function insertUser(userData) {
  // buatlah fungsi insertUser yang menerima satu parameter userData. Fungsi ini akan memasukkan data user baru ke dalam database.
  try {
    const newUser = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error inserting user: ", error);
    throw error;
  }
}

async function findUsers() {
  // buatlah fungsi findUsers yang tidak menerima parameter. Fungsi ini akan mengembalikan seluruh data user yang ada di database.
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error finding users: ", error);
    throw error;
  }
}

async function findUserById(id) {
  // buatlah fungsi findUserById yang menerima satu parameter id. Fungsi ini akan mengembalikan data user berdasarkan id yang diberikan.
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user;
  } catch (error) {
    console.error("Error finding user by id: ", error);
    throw error;
  }
}

async function editUser(id, userData) {
  // buatlah fungsi editUser yang menerima dua parameter, id dan userData. Fungsi ini akan mengubah data user berdasarkan id yang diberikan.
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: userData,
    });
    return updatedUser;
  } catch (error) {
    console.error("Error update user data: ", error);
    throw error;
  }
}

async function deleteUser(id) {
  // buatlah fungsi deleteUser yang menerima satu parameter id. Fungsi ini akan menghapus data user berdasarkan id yang diberikan.
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user: ", error);
    throw error;
  }
}

module.exports = {
  insertUser,
  findUsers,
  findUserById,
  editUser,
  deleteUser,
};
