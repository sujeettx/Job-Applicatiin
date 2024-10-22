const express = require("express");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");
const connectDB = require('./Config/ConnectDb')
// Load environment variables from .env file
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Import routes
const companyRoutes = require("./Routes/companyRoutes");
const jobRoutes = require("./Routes/jobRoutes");

// Set up routes
app.use("/companies", companyRoutes);
app.use("/jobs", jobRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
connectDB();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
