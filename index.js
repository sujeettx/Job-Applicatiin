const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");
const connectDB = require('./Config/ConnectDb')
// Load environment variables from .env file
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));

// Import routes
const companyRoutes = require("./Routes/companyRoutes");
const jobRoutes = require("./Routes/JobRoutes");
const jobAlertRoute = require("./Routes/jobalertRoutes");

// Set up routes
app.use("/company", companyRoutes);
app.use("/jobs", jobRoutes);
app.use("/jobalert", jobAlertRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
connectDB();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
