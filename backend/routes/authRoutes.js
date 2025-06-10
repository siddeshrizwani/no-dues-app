import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user (admin or staff)
// @access  Public
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate a user and return a token
// @access  Public
router.post("/login", loginUser);

export default router;
