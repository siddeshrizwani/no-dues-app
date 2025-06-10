import express from "express";
import { authenticateToken, isAdmin } from "../middleware/authMiddleware.js";
import {
  getAllDepartments,
  createDepartment,
} from "../controllers/adminController.js";

const router = express.Router();

// All routes in this file are prefixed with /api/admin and are protected

// @route   GET /api/admin/departments
// @desc    Get a list of all departments
// @access  Admin
router.get("/departments", authenticateToken, isAdmin, getAllDepartments);

// @route   POST /api/admin/departments
// @desc    Create a new department
// @access  Admin
router.post("/departments", authenticateToken, isAdmin, createDepartment);

// You can add more admin-specific routes here, for example:
// router.get('/users', authenticateToken, isAdmin, getAllUsers);
// router.put('/users/:userId/assign-department', authenticateToken, isAdmin, assignDepartmentToUser);

export default router;
