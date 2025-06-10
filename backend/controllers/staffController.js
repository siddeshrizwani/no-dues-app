import pool from "../config/db.js";

// @desc    Get all dues for the staff's department
// @route   GET /api/staff/dues
// @access  Staff
export const getDepartmentDues = async (req, res) => {
  const department_id = req.user.department_id;
  if (!department_id) {
    return res
      .status(400)
      .json({ message: "Staff member is not associated with a department." });
  }
  try {
    const result = await pool.query(
      `SELECT d.id, s.name as student_name, s.roll_number, d.amount, d.reason, d.status, d.created_at 
             FROM dues d 
             JOIN students s ON d.student_id = s.id 
             WHERE d.department_id = $1 ORDER BY d.created_at DESC`,
      [department_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching department dues:", error);
    res.status(500).json({ message: "Error fetching dues" });
  }
};

// @desc    Add a new due for a student
// @route   POST /api/staff/dues
// @access  Staff
export const createDue = async (req, res) => {
  const { student_id, amount, reason } = req.body;
  const department_id = req.user.department_id;

  if (!department_id) {
    return res
      .status(400)
      .json({ message: "Staff member is not associated with a department." });
  }
  if (!student_id || !amount) {
    return res
      .status(400)
      .json({ message: "Student ID and amount are required." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO dues (student_id, department_id, amount, reason) VALUES ($1, $2, $3, $4) RETURNING *",
      [student_id, department_id, amount, reason]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating due:", error);
    res.status(500).json({ message: "Error creating due" });
  }
};

// @desc    Clear a specific due
// @route   PUT /api/staff/dues/:dueId/clear
// @access  Staff
export const clearDue = async (req, res) => {
  const { dueId } = req.params;
  const department_id = req.user.department_id;

  try {
    // First, verify the due belongs to the staff's department
    const dueResult = await pool.query(
      "SELECT * FROM dues WHERE id = $1 AND department_id = $2",
      [dueId, department_id]
    );
    if (dueResult.rows.length === 0) {
      return res
        .status(404)
        .json({
          message: "Due not found or you don't have permission to clear it.",
        });
    }

    // Update the due status to 'cleared'
    const result = await pool.query(
      "UPDATE dues SET status = 'cleared', cleared_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [dueId]
    );

    // Optional: Check if all dues for this student are now cleared and update the master request
    const student_id = result.rows[0].student_id;
    const pendingDues = await pool.query(
      "SELECT COUNT(*) FROM dues WHERE student_id = $1 AND status = 'pending'",
      [student_id]
    );

    if (parseInt(pendingDues.rows[0].count) === 0) {
      await pool.query(
        "UPDATE no_dues_requests SET status = 'cleared', completion_date = CURRENT_TIMESTAMP WHERE student_id = $1 AND status != 'cleared'",
        [student_id]
      );
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error clearing due:", error);
    res.status(500).json({ message: "Error clearing due" });
  }
};
