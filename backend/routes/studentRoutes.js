import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  requestNoDues,
  getNoDuesStatus,
} from "../controllers/studentController.js";

const router = express.Router();

// All routes in this file are prefixed with /api/student and are protected.
// Note: Student authentication middleware would be needed here in a real scenario
// where students have a separate login from users. For now, we use the general authenticateToken.

// @route   POST /api/student/no-dues/request
// @desc    Initiate a No-Dues Certificate request
// @access  Student
router.post("/no-dues/request", authenticateToken, requestNoDues);

// @route   GET /api/student/no-dues/status
// @desc    Get the status of the logged-in student's dues and NDC request
// @access  Student
router.get("/no-dues/status", authenticateToken, getNoDuesStatus);

export default router;
