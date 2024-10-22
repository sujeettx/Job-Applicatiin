const express = require("express");
const {
  postJobController,
  fetchAllJobsController,
  fetchJobByIdController,
  deleteJobController,
  updateJobController,
} = require("../Controllers/jobController"); // Import the controllers

const router = express.Router();

// Route to post a new job
router.post("/post", postJobController);

// Route to fetch all posted jobs
router.get("/all", fetchAllJobsController);

// Route to fetch a specific job by ID
router.get("/:id", fetchJobByIdController);

// Route to delete a job by ID
router.delete("/:id", deleteJobController);

// Route to update a job by ID
router.put("/:id", updateJobController);

module.exports = router;
