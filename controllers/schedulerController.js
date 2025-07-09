const schedulerService = require('../services/schedulerService');

exports.scheduleMessage = async (req, res) => {
  try {
    const result = await schedulerService.scheduleMessageInsert(req.body);
    res.status(result.statusCode).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
};
