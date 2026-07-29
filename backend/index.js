const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


const connectDB = require("./config/database");
const userRoutes = require("./route/user");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();


// Connect MongoDB
connectDB();


// Security middleware



// Logger middleware



// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
  })
);


// Parse JSON body
app.use(express.json());


// Parse cookies
app.use(cookieParser());


// Health check API
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully"
    });
});


// User routes
app.use("/api/users", userRoutes);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


// Global Error Handler
app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(err.statusCode || 5000).json({
    success: false,
    message: err.message || "Internal Server Error"
  });

});


// Server Port
const PORT = process.env.PORT;


// Start Server
const server = app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});