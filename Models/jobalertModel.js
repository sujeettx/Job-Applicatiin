const mongoose = require('mongoose');

const jobAlertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    trim: true
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['entry', 'mid', 'senior', 'expert']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  candidates: [{
    type: String,
    required: true,
    validate: {
      validator: function(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JobAlert', jobAlertSchema);
