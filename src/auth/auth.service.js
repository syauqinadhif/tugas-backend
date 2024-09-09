const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("./auth.repository");

// Fungsi untuk menghasilkan token JWT
function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// Fungsi untuk mendaftarkan user baru
async function register(username, email, password) {
  try {
    // Cek apakah username sudah terdaftar
    const existingUser = await userRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error("Username already taken");
    }

    // Cek apakah email sudah terdaftar
    const existingEmail = await userRepository.findUserByEmail(email);
    if (existingEmail) {
      throw new Error("Email already taken");
    }

    // Hash password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat data user baru
    const newUser = await userRepository.createUser({
      username,
      email,
      password: hashedPassword,
      role: "USER", // Default role USER
    });

    // Kembalikan user baru beserta token JWT
    const token = generateToken(newUser);
    return { user: newUser, token };
  } catch (error) {
    throw new Error("Registration failed: " + error.message);
  }
}

// Fungsi untuk login user
async function login(username, password) {
  try {
    // Cari user berdasarkan username
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
      throw new Error("Invalid username or password");
    }

    // Periksa kecocokan password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password");
    }

    // Jika login berhasil, generate token JWT
    const token = generateToken(user);
    return { user, token };
  } catch (error) {
    throw new Error("Login failed: " + error.message);
  }
}

module.exports = { register, login };
