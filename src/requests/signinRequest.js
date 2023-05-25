const { body } = require('express-validator');
const { validate } = require('./validator');

const validateSigninRequest = validate([
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

module.exports = validateSigninRequest;
