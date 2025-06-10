import pool from "../config/db.js";

// @desc    Get all departments
// @route   GET /api/admin/departments
// @access  Admin
export const getAllDepartments = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM departments ORDER BY name");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Error fetching departments" });
  }
};

// @desc    Create a new department
// @route   POST /api/admin/departments
// @access  Admin
export const createDepartment = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Department name is required." });
  }
  try {
    const result = await pool.query(
      "INSERT INTO departments (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Error creating department" });
  }
};

// You can add more admin-specific functions here, for example:
// - Get all users
// - Assign a user to a department
// - Get system-wide analytics
