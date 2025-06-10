import pool from "../config/db.js";

async function setupDatabase() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Departments Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      );
    `);
    console.log('Table "departments" is ready.');

    // Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role VARCHAR(20) CHECK (role IN ('admin', 'staff')) NOT NULL,
        department_id INT REFERENCES departments(id) ON DELETE SET NULL,
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
        password_hash TEXT NOT NULL,
        semester INT,
        department VARCHAR(100)
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
        UNIQUE(student_id, department_id, status)
      );
    `);
    console.log('Table "dues" is ready.');

    // No-Dues Request Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS no_dues_requests (
        id SERIAL PRIMARY KEY,
        student_id INT REFERENCES students(id) ON DELETE CASCADE UNIQUE,
        status VARCHAR(20) CHECK (status IN ('initiated', 'in_progress', 'cleared', 'rejected')) DEFAULT 'initiated',
        request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completion_date TIMESTAMP,
        remarks TEXT
      );
    `);
    console.log('Table "no_dues_requests" is ready.');

    await client.query("COMMIT");
    console.log("Database setup completed successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error setting up database:", error);
    process.exit(1);
  } finally {
    client.release();
  }
}

export default setupDatabase;
