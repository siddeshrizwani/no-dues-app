import bcrypt from "bcryptjs";
import pool from "./config/db.js";

/**
 * This script completely resets, sets up, and seeds the database.
 * 1. It DROPS existing tables to ensure a clean state.
 * 2. It creates all necessary tables with the correct schema.
 * 3. It inserts sample data for testing.
 * To run: node seed.js
 */
async function setupAndSeedDatabase() {
  const client = await pool.connect();
  console.log("Connected to the database.");

  try {
    await client.query("BEGIN");
    console.log("Step 1: Resetting database by dropping existing tables...");

    // Drop tables in reverse order of creation to avoid foreign key constraint errors
    await client.query(
      "DROP TABLE IF EXISTS no_dues_requests, dues, students, users, departments CASCADE;"
    );
    console.log("✅ Existing tables dropped.");

    console.log("Step 2: Setting up fresh database schema...");

    // --- Create Tables ---
    await client.query(`
      CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      );
    `);

    await client.query(
      `CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password_hash TEXT NOT NULL, role VARCHAR(20) CHECK (role IN ('admin', 'staff')) NOT NULL, department_id INT REFERENCES departments(id) ON DELETE SET NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    );
    await client.query(
      `CREATE TABLE students (id SERIAL PRIMARY KEY, roll_number VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, password_hash TEXT NOT NULL, semester INT, department VARCHAR(100));`
    );
    await client.query(
      `CREATE TABLE dues (id SERIAL PRIMARY KEY, student_id INT REFERENCES students(id) ON DELETE CASCADE, department_id INT REFERENCES departments(id) ON DELETE CASCADE, amount DECIMAL(10, 2) NOT NULL, reason TEXT, status VARCHAR(20) CHECK (status IN ('pending', 'cleared')) DEFAULT 'pending', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, cleared_at TIMESTAMP, UNIQUE(student_id, department_id, status, reason));`
    );
    await client.query(
      `CREATE TABLE no_dues_requests (id SERIAL PRIMARY KEY, student_id INT REFERENCES students(id) ON DELETE CASCADE UNIQUE, status VARCHAR(20) CHECK (status IN ('initiated', 'in_progress', 'cleared', 'rejected')) DEFAULT 'initiated', request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, completion_date TIMESTAMP, remarks TEXT);`
    );

    console.log("✅ Schema setup complete. All tables are ready.");
    console.log("Step 3: Seeding initial data...");

    // --- Insert Departments ---
    const deptRes = await client.query(`
      INSERT INTO departments (name) VALUES 
      ('Library'), ('Hostel'), ('Laboratory'), ('Accounts') 
      ON CONFLICT (name) DO NOTHING RETURNING id, name;
    `);
    console.log("Departments seeded.");
    const libraryIdResult = await client.query(
      "SELECT id FROM departments WHERE name = 'Library'"
    );
    const libraryId = libraryIdResult.rows[0]?.id;

    // --- Hash Passwords & Insert Users (Admin, Staff, Student) ---
    const password = "password123";
    const saltRounds = 10;
    const adminPasswordHash = await bcrypt.hash(password, saltRounds);
    const staffPasswordHash = await bcrypt.hash(password, saltRounds);
    const studentPasswordHash = await bcrypt.hash(password, saltRounds);
    console.log("Passwords hashed.");

    await client.query(
      `INSERT INTO users (name, email, password_hash, role) VALUES ('Admin User', 'admin@sunyam.com', $1, 'admin') ON CONFLICT (email) DO NOTHING;`,
      [adminPasswordHash]
    );
    console.log("Admin user created: admin@sunyam.com");

    if (libraryId) {
      await client.query(
        `INSERT INTO users (name, email, password_hash, role, department_id) VALUES ('Library Staff', 'library@sunyam.com', $1, 'staff', $2) ON CONFLICT (email) DO NOTHING;`,
        [staffPasswordHash, libraryId]
      );
      console.log("Staff user created: library@sunyam.com");
    }

    await client.query(
      `INSERT INTO students (roll_number, name, email, password_hash, semester, department) VALUES ('S12345', 'Srijan Suryansh', 'srijan@sunyam.com', $1, 8, 'Computer Science') ON CONFLICT (email) DO NOTHING;`,
      [studentPasswordHash]
    );
    console.log("Student user created: srijan@sunyam.com");

    await client.query("COMMIT");
    console.log("✅ Seeding completed successfully!");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error during database setup/seeding:", error);
  } finally {
    client.release();
    console.log("Database connection closed.");
    pool.end();
  }
}

setupAndSeedDatabase();
