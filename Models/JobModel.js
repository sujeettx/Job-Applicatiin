const mongoose = require('mongoose');

const jobsModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true,
        enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Expert Level']
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    Postdate: {
        type: Date,
        default: Date.now
    },
    DeadlineDate: {
        type: Date,
        required: true
    }
});

const Jobs = mongoose.model("jobs", jobsModel);
module.exports = Jobs;