const express = require('express');
const UserController = require("../controllers/user");
const router = express.Router();

router.post('/signup', UserController.createUser);

router.post('/login', UserController.loginUser);

router.get('/confirmation/:token', UserController.validateUser);

router.post('/resend', UserController.resendValidationToken);

router.post('/changePassword', UserController.changeUserPassword);

router.post('/sendResetPasswordToken', UserController.sendResetPasswordToken);

module.exports = router;
