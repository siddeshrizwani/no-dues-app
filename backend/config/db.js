import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

// The pool will use the connection details from your .env file
// PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
