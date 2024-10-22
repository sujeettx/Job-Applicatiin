const express = require("express");
const {
  loginController,
  registerController,
  fetchAllCompaniesController, // Correct name
} = require("../Controllers/CompanyController");
const router = express.Router();

// Route to handle company registration
router.post("/register", registerController);

// Route to handle company login
router.post("/login", loginController);

// Route to fetch all companies (or users)
router.get("/Allcompanyies", fetchAllCompaniesController); // Correct

module.exports = router;
