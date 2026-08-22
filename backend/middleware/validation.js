const { validationResult } = require('express-validator');

function validateRequest(req, res, next) {
  // Check if POST / PUT / PATCH request body is completely empty
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Request body is empty. Please fill out the form fields before submitting.'
      });
    }
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg
      }))
    });
  }
  next();
}

module.exports = { validateRequest };
