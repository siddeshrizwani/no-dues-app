// =================================================================
// FILE: server.js
// =================================================================
// This is the main entry point for the application. It sets up the
// Express server, connects to the database, and configures routes.
// NOTE: This version uses ES Module (import/export) syntax.
// =================================================================

import express from 'express';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Pool } = pg;

// --- Configuration ---
const PORT = process.env.PORT || 3000;
const SECRET_KEY = 'your_super_secret_key'; // Replace with a strong secret key in a .env file for production

// --- Database Connection ---
// Replace with your actual PostgreSQL connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'no_dues_db',
  password: 'your_password', // Replace with your password
  port: 5432,
});

// --- Express App Initialization ---
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// =================================================================
// DATABASE SCHEMA SETUP
// =================================================================
// This function initializes the database by creating all necessary tables
// if they don't already exist.
// =================================================================

async function setupDatabase() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Departments Table (Library, Hostel, Sports, Accounts, etc.)
    // Must be created before users
    await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      );
    `);
    console.log('Table "departments" is ready.');

    // Users Table (for Admins, Department Staff)
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(20) CHECK (role IN ('admin', 'staff')) NOT NULL,
        department_id INT REFERENCES departments(id) ON DELETE SET NULL, -- Staff are linked to a department
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "users" is ready.');
    
    // Students Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        roll_number VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL, -- Students can log in to check their status
        semester INT,
        department VARCHAR(100) -- e.g., 'Computer Science'
      );
    `);
    console.log('Table "students" is ready.');

    // Dues Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS dues (
        id SERIAL PRIMARY KEY,
        student_id INT REFERENCES students(id) ON DELETE CASCADE,
        department_id INT REFERENCES departments(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2) NOT NULL,
        reason TEXT,
        status VARCHAR(20) CHECK (status IN ('pending', 'cleared')) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        cleared_at TIMESTAMP,
        UNIQUE(student_id, department_id) -- A student can have only one pending due per department
      );
    `);
    console.log('Table "dues" is ready.');
    
    // No-Dues Request Table (tracks the overall clearance status)
    await client.query(`
      CREATE TABLE IF NOT EXISTS no_dues_requests (
        id SERIAL PRIMARY KEY,
        student_id INT REFERENCES students(id) ON DELETE CASCADE UNIQUE,
        status VARCHAR(20) CHECK (status IN ('initiated', 'in_progress', 'cleared', 'rejected')) DEFAULT 'initiated',
        request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completion_date TIMESTAMP,
        remarks TEXT -- For admin/rejection notes
      );
    `);
    console.log('Table "no_dues_requests" is ready.');

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error setting up database:', error);
    process.exit(1); // Exit if database setup fails
  } finally {
    client.release();
  }
}

// =================================================================
// MIDDLEWARE
// =================================================================
// Middleware for authenticating users and checking roles.
// =================================================================

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
}

const isStaff = (req, res, next) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: "Access denied. Staff only." });
    }
    next();
}


// =================================================================
// API ROUTES
// =================================================================

// --- Auth Routes ---
app.post('/api/register', async (req, res) => {
    const { name, email, password, role, department_id } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required." });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash, role, department_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [name, email, hashedPassword, role, department_id]
        );
        res.status(201).json({ message: "User registered successfully", userId: result.rows[0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role, department_id: user.department_id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
});


// --- Admin Routes ---
app.get('/api/admin/departments', authenticateToken, isAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM departments ORDER BY name');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching departments" });
    }
});

app.post('/api/admin/departments', authenticateToken, isAdmin, async (req, res) => {
    const { name } = req.body;
    try {
        const result = await pool.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error creating department" });
    }
});

// --- Staff Routes (Managing Dues) ---
app.post('/api/staff/dues', authenticateToken, isStaff, async (req, res) => {
    const { student_id, amount, reason } = req.body;
    const department_id = req.user.department_id; // Staff can only add dues for their own department

    if (!department_id) {
        return res.status(400).json({ message: "Staff member is not associated with a department." });
    }

    try {
        const result = await pool.query(
            'INSERT INTO dues (student_id, department_id, amount, reason) VALUES ($1, $2, $3, $4) RETURNING *',
            [student_id, department_id, amount, reason]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating due' });
    }
});

app.put('/api/staff/dues/:dueId/clear', authenticateToken, isStaff, async (req, res) => {
    const { dueId } = req.params;
    const department_id = req.user.department_id;

    try {
        const dueResult = await pool.query('SELECT * FROM dues WHERE id = $1 AND department_id = $2', [dueId, department_id]);
        if (dueResult.rows.length === 0) {
            return res.status(404).json({ message: "Due not found or you don't have permission to clear it." });
        }
        
        const result = await pool.query(
            "UPDATE dues SET status = 'cleared', cleared_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
            [dueId]
        );

        // Check if all dues are cleared for the student to update the main request status
        const student_id = result.rows[0].student_id;
        const pendingDues = await pool.query("SELECT COUNT(*) FROM dues WHERE student_id = $1 AND status = 'pending'", [student_id]);

        if (parseInt(pendingDues.rows[0].count) === 0) {
            await pool.query("UPDATE no_dues_requests SET status = 'cleared', completion_date = CURRENT_TIMESTAMP WHERE student_id = $1", [student_id]);
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error clearing due' });
    }
});


// --- Student Routes ---
app.post('/api/student/no-dues/request', authenticateToken, async (req, res) => {
    // Assuming student is authenticated and their ID is in the token
    const student_id = req.user.id; 
    
    try {
        // Check if a request already exists
        const existingRequest = await pool.query('SELECT * FROM no_dues_requests WHERE student_id = $1', [student_id]);
        if (existingRequest.rows.length > 0) {
            return res.status(400).json({ message: "A no-dues request already exists for you." });
        }

        const result = await pool.query(
            'INSERT INTO no_dues_requests (student_id) VALUES ($1) RETURNING *',
            [student_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error initiating no-dues request.' });
    }
});

app.get('/api/student/no-dues/status', authenticateToken, async (req, res) => {
    const student_id = req.user.id;
    try {
        const statusRes = await pool.query('SELECT * FROM no_dues_requests WHERE student_id = $1', [student_id]);
        if (statusRes.rows.length === 0) {
            return res.status(404).json({ message: "No request found. Please initiate a request first." });
        }
        
        const duesRes = await pool.query(
            `SELECT d.id, d.amount, d.reason, d.status, dep.name as department_name 
             FROM dues d
             JOIN departments dep ON d.department_id = dep.id
             WHERE d.student_id = $1 ORDER BY d.status, dep.name`,
            [student_id]
        );

        res.json({
            overall_status: statusRes.rows[0],
            department_dues: duesRes.rows
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching no-dues status.' });
    }
});


// --- Server Start ---
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await setupDatabase();
  console.log("Backend server is fully initialized and ready.");
});
