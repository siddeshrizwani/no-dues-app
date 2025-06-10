import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import setupDatabase from "./utils/dbSetup.js";

// --- Import Route Files ---
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

// --- Basic Configuration ---
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// --- Core Middleware ---
// Enable Cross-Origin Resource Sharing for your frontend to be able to make requests
app.use(cors());
// Middleware to parse incoming JSON request bodies
app.use(express.json());

// --- API Routes ---
// Mount the imported route modules to specific paths
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/student", studentRoutes);

// --- Basic Welcome Route ---
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the No Dues Certificate API!" });
});

// --- Server Start ---
const startServer = async () => {
  try {
    // Optional: you can run setupDatabase() here on every start if you want,
    // but since we have a separate seed script, it's not strictly necessary.
    // await setupDatabase();

    // This is the crucial part that starts the server and keeps it running.
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(
        "Backend server is fully initialized and ready to accept requests."
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();