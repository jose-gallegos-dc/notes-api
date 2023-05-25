const { body } = require('express-validator');
const { validate } = require('./validator');

const validateSignupRequest = validate([
   body('username')
      .notEmpty()
      .withMessage('The username field is required.')
      .isString()
      .withMessage('The username field must be a string.'),
   body('email')
      .notEmpty()
      .withMessage('The email field is required.')
      .isString()
      .withMessage('The email field must be a string.')
      .isEmail()
      .withMessage('The email field must be a valid email.'),
   body('password')
      .notEmpty()
      .withMessage('The password field is required.')
      .isString()
      .withMessage('The password field must be a string.')
      .isLength({ min: 8, max: 24 })
      .withMessage('The password field must be between 8 and 24 characters long.'),
]);

module.exports = validateSignupRequest;
