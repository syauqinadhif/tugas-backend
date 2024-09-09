const e = require("express");
const jwt = require("jsonwebtoken");

function authorizeJWT(req, res, next) {
  // Cek apakah header Authorization ada
  const authHeader = req.headers.authorization;

  if (authHeader) {
    // Token berada setelah kata "Bearer" dalam header Authorization
    const token = authHeader.split(" ")[1];

    // Verifikasi token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      // Menyimpan informasi user ke dalam request object
      req.user = user;

      // Cek apakah user login sebagai 'user' atau 'admin'
      if (user.role === "USER" || user.role === "ADMIN") {
        next(); // Lanjutkan ke middleware berikutnya atau route handler
      } else {
        // Jika role bukan 'user' atau 'admin', tolak akses
        return res
          .status(403)
          .json({ message: "Access denied. Role not allowed." });
      }
    });
  } else {
    // Jika tidak ada token dalam header
    return res.status(401).json({ message: "Authorization token is missing" });
  }
}
module.exports = authorizeJWT;
