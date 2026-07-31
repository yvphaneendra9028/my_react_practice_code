const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/database");
const userRoutes = require("./route/user");
const productRoutes = require('./route/product');
const planRoutes = require('./route/plan');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();


// Connect MongoDB
connectDB();


// CORS configuration
const allowedOrigin =
  process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
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
app.use("/api/products",productRoutes);
app.use('/api/plans',planRoutes);


// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});


// Global Error Handler
app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });

});


// Server Port
// Render automatically provides PORT
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
