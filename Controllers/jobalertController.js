const fs = require('fs');
const path = require('path');
const JobAlert = require('../Models/jobalertModel');
const { sendEmail } = require('../Config/jobalertConfig');

const sendJobAlert = async (req, res) => {
  try {
    const { title, description, experienceLevel, endDate, candidates } = req.body;

    // Read the HTML template file
    const templatePath = path.join(__dirname, '../jobalertTemplete/jobAlertTemplate.html');
    let emailTemplate = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders in the HTML template with dynamic data
    emailTemplate = emailTemplate
      .replace(/{{title}}/g, title)
      .replace(/{{description}}/g, description)
      .replace(/{{experienceLevel}}/g, experienceLevel)
      .replace(/{{endDate}}/g, new Date(endDate).toLocaleDateString());

    // Create a new job alert in the database
    const jobAlert = await JobAlert.create({
      title,
      description,
      experienceLevel,
      endDate,
      candidates,
    });

    // Send emails to all candidates
    const emailPromises = candidates.map((candidateEmail) =>
      sendEmail(candidateEmail, `Job Alert: ${title}`, null, emailTemplate)
    );

    await Promise.all(emailPromises);

    res.status(200).json({
      success: true,
      message: 'Job alert sent successfully!',
      data: jobAlert,
    });
  } catch (error) {
    console.error('Job alert error:', error);

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message,
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to send job alert. Please try again later.',
    });
  }
};

const getJobAlerts = async (req, res) => {
  try {
    const jobAlerts = await JobAlert.find()
      .sort('-createdAt')
      .select('-__v');

    res.status(200).json({
      success: true,
      count: jobAlerts.length,
      data: jobAlerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job alerts',
    });
  }
};

module.exports = {
  sendJobAlert,
  getJobAlerts,
};
