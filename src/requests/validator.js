const { validationResult } = require('express-validator');

const validate = (validations) => {
   return [
      ...validations,
      (req, res, next) => {
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
            const errorMessages = errors.mapped();
            const formattedErrors = {};
            Object.keys(errorMessages).forEach((key) => {
               formattedErrors[key] = errorMessages[key].msg;
            });
            return res.status(400).json({ errors: [formattedErrors] });
         }
         next();
      },
   ];
};

module.exports = { validate };
