const { body } = require('express-validator');
const { validate } = require('./validator');

const validateNoteRequest = validate([
   body('title')
      .notEmpty()
      .withMessage('The title field is required.')
      .isString()
      .withMessage('The title field must be a string.'),
   body('description')
      .notEmpty()
      .withMessage('The description field is required.')
      .isString()
      .withMessage('The description field must be a string.'),
]);

module.exports = validateNoteRequest;
