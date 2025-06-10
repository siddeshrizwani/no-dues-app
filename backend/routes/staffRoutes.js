import express from "express";
import { authenticateToken, isStaff } from "../middleware/authMiddleware.js";
import {
  getDepartmentDues,
  createDue,
  clearDue,
} from "../controllers/staffController.js";

const router = express.Router();

// All routes in this file are prefixed with /api/staff and are protected

// @route   GET /api/staff/dues
// @desc    Get all dues for the staff's own department
// @access  Staff
router.get("/dues", authenticateToken, isStaff, getDepartmentDues);

// @route   POST /api/staff/dues
// @desc    Add a new due for a student
// @access  Staff
router.post("/dues", authenticateToken, isStaff, createDue);

// @route   PUT /api/staff/dues/:dueId/clear
// @desc    Mark a specific due as cleared
// @access  Staff
router.put("/dues/:dueId/clear", authenticateToken, isStaff, clearDue);

export default router;
