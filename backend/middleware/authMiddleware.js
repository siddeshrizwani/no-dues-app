import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "your_super_secret_key";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) {
    return res.status(401).json({ message: "Authentication token required." });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
    req.user = user;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Administrator privileges required." });
  }
  next();
};

export const isStaff = (req, res, next) => {
  if (req.user.role !== "staff") {
    return res
      .status(403)
      .json({ message: "Access denied. Staff privileges required." });
  }
  next();
};
