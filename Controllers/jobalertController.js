const JobAlert = require('../Models/jobalertModel');
const { sendEmail } = require('../Config/jobalertConfig');

const sendJobAlert = async (req, res) => {
  try {
    const { title, description, experienceLevel, endDate, candidates } = req.body;

    // Create new job alert in database
    const jobAlert = await JobAlert.create({
      title,
      description,
      experienceLevel,
      endDate,
      candidates
    });

    // Send emails to all candidates
    const emailPromises = candidates.map(candidateEmail => {
      const emailText = `
Job Title: ${title}

Description: ${description}
Experience Level: ${experienceLevel}
End Date: ${new Date(endDate).toLocaleDateString()}

Please contact us if you're interested.`;

      return sendEmail(
        candidateEmail,
        `Job Alert: ${title}`,
        emailText
      );
    });

    await Promise.all(emailPromises);

    res.status(200).json({
      success: true,
      message: 'Job alert sent successfully!',
      data: jobAlert
    });

  } catch (error) {
    console.error('Job alert error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to send job alert. Please try again later.'
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
      data: jobAlerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch job alerts'
    });
  }
};

module.exports = {
  sendJobAlert,
  getJobAlerts
};