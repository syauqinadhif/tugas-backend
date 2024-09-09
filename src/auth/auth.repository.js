const prisma = require("../db");

async function createUser(userData) {
  try {
    const newUser = await prisma.user.create({
      data: userData,
    });
    return newUser;
  } catch (error) {
    throw new Error("Failed to create user");
  }
}

async function findUserByUsername(username) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: username }, // Hanya mengirimkan string untuk username
    });
    return user;
  } catch (error) {
    throw new Error("Failed to find user by username");
  }
}

async function findUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email }, // Hanya mengirimkan string untuk email
    });
    return user;
  } catch (error) {
    throw new Error("Failed to find user by email");
  }
}

module.exports = { createUser, findUserByUsername, findUserByEmail };
