import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const SECRET_KEY = process.env.SECRET_KEY || "your_super_secret_key";

// @desc    Register a new staff or admin user
// @route   POST /api/register
// @access  Public (or could be admin-only in production)
export const registerUser = async (req, res) => {
  const { name, email, password, role, department_id } = req.body;
  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Name, email, password, and role are required." });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash, role, department_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, email, hashedPassword, role, department_id]
    );
    res
      .status(201)
      .json({
        message: "User registered successfully",
        userId: result.rows[0].id,
      });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
};

// @desc    Authenticate a user and get a token
// @route   POST /api/login
// @access  Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role, department_id: user.department_id },
      SECRET_KEY,
      { expiresIn: "8h" } // Token expires in 8 hours
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};
