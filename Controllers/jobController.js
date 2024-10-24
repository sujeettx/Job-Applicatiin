const expressAsyncHandler = require("express-async-handler");
const Jobs = require("../Models/JobModel"); // Import the Jobs model

// Controller to post a new job
const postJobController = expressAsyncHandler(async (req, res) => {
  const { title, description, experienceLevel, location, salary, DeadlineDate } = req.body;

  // Check if all necessary fields are provided
  if (!title || !description || !experienceLevel || !location || !salary || !DeadlineDate) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Create and save the new job
  const job = await Jobs.create({
    title,
    description,
    experienceLevel,
    location,
    salary,
    DeadlineDate,
  });

  if (job) {
    return res.status(201).json({
      scucess:true,
      message: "Job posted successfully",
    }); // Respond with the created job
  } else {
    res.status(400);
    throw new Error("Job posting failed");
  }
});

// Controller to fetch all posted jobs
const fetchAllJobsController = expressAsyncHandler(async (req, res) => {
  const jobs = await Jobs.find({}); // Fetch all jobs from the database
  res.status(200).json(jobs); // Respond with the fetched jobs
});

// Controller to fetch a specific job by ID
const fetchJobByIdController = expressAsyncHandler(async (req, res) => {
  const jobId = req.params.id;

  // Find job by ID
  const job = await Jobs.findById(jobId);

  if (job) {
    res.status(200).json(job); // Respond with the job data
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});
const deleteJobController = expressAsyncHandler(async (req, res) => {
  const jobId = req.params.id;

  // Find the job by ID
  const job = await Jobs.findById(jobId);

  if (job) {
    // Use the correct Mongoose delete method
    await Jobs.findByIdAndDelete(jobId);
    // OR await job.deleteOne();
    
    res.status(200).json({ message: "Job deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

// Controller to update a job
const updateJobController = expressAsyncHandler(async (req, res) => {
  const jobId = req.params.id;
  const { title, description, experienceLevel, location, salary, DeadlineDate } = req.body;

  // Find the job by ID
  const job = await Jobs.findById(jobId);

  if (job) {
    // Update the job fields
    job.title = title || job.title;
    job.description = description || job.description;
    job.experienceLevel = experienceLevel || job.experienceLevel;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    job.DeadlineDate = DeadlineDate || job.DeadlineDate;

    const updatedJob = await job.save(); // Save the updated job
    res.status(200).json({
      message:"job updated successfully",
      updatedJob,
    }); // Respond with the updated job data
  } else {
    res.status(404);
    throw new Error("Job not found");
  }
});

module.exports = {
  postJobController,
  fetchAllJobsController,
  fetchJobByIdController,
  deleteJobController,
  updateJobController,
};
