import pool from "../config/db.js";

// @desc    Initiate a No-Dues Certificate request for the logged-in student
// @route   POST /api/student/no-dues/request
// @access  Student (Requires authentication)
export const requestNoDues = async (req, res) => {
  // The student's ID is retrieved from the authenticated user token
  const student_id = req.user.id;

  try {
    // Check if a request already exists to prevent duplicates
    const existingRequest = await pool.query(
      "SELECT * FROM no_dues_requests WHERE student_id = $1",
      [student_id]
    );
    if (existingRequest.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "A no-dues request already exists for you." });
    }

    // Create the new request
    const result = await pool.query(
      "INSERT INTO no_dues_requests (student_id) VALUES ($1) RETURNING *",
      [student_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error initiating no-dues request:", error);
    res.status(500).json({ message: "Error initiating no-dues request." });
  }
};

// @desc    Get the overall status and detailed dues list for the logged-in student
// @route   GET /api/student/no-dues/status
// @access  Student (Requires authentication)
export const getNoDuesStatus = async (req, res) => {
  const student_id = req.user.id;
  try {
    // Fetch the overall status of their request
    const statusRes = await pool.query(
      "SELECT * FROM no_dues_requests WHERE student_id = $1",
      [student_id]
    );
    if (statusRes.rows.length === 0) {
      return res
        .status(404)
        .json({
          message: "No request found. Please initiate a request first.",
        });
    }

    // Fetch a detailed list of all their dues from various departments
    const duesRes = await pool.query(
      `SELECT d.id, d.amount, d.reason, d.status, dep.name as department_name 
             FROM dues d
             JOIN departments dep ON d.department_id = dep.id
             WHERE d.student_id = $1 ORDER BY d.status, dep.name`,
      [student_id]
    );

    res.json({
      overall_status: statusRes.rows[0],
      department_dues: duesRes.rows,
    });
  } catch (error) {
    console.error("Error fetching no-dues status:", error);
    res.status(500).json({ message: "Error fetching no-dues status." });
  }
};
