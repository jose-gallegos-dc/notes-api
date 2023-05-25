const express = require('express');
const { signup, signin } = require('../controllers/authController');
const validateSignupRequest = require('../requests/signupRequest');
const validateSigninRequest = require('../requests/signinRequest');
const authRouter = express.Router();

authRouter.post('/signup', validateSignupRequest, signup);

authRouter.post('/signin', validateSigninRequest, signin);

module.exports = authRouter;