const PolicyService = require('../services/policyService');

exports.uploadData = async (req, res) => {
  try {
    const result = await PolicyService.handleUpload(req);

    res.status(result.statusCode || 200).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.searchPolicyByUsername = async (req, res) => {
  try {
    const result = await PolicyService.searchPolicyByUsername(req.query.name);

    return res.status(result.statusCode || 200).json(result);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.getUserPolicyStats = async (req, res) => {
  try {
    const result = await PolicyService.getUserPolicyStats();
    res.status(result.statusCode || 200).json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
};