const express = require("express");
const {
  loginController,
  registerController,
  fetchAllCompaniesController,
  top10ComapnyConterorsController,
  cachedTopUsers, // Correctly imported
} = require("../Controllers/CompanyController");

const router = express.Router();

// Route to handle company registration
router.post("/register", registerController);

// Route to handle company login
router.post("/login", loginController);

// Route to fetch all companies (or users)
router.get("/allcompany", fetchAllCompaniesController); // Corrected path

// Route to fetch top 10 companies based on user activity
router.get("/top10comapny", (req, res) => {
  res.status(200).json(cachedTopUsers); // Serve cached top users
});

// Route to trigger updating top companies manually
router.get("/update-top10", top10ComapnyConterorsController);

module.exports = router;
