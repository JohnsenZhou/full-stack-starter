const express = require('express');
const joi = require('joi');
const validate = require('express-validation');
const userController = require('../controllers/user.controller');
const config = require('../../config');

const router = express.Router();

const paramSchema  = {
  login: {
    body: {
      phoneNum: joi.number().required(),
      password: joi.string().required()
    }
  },

  signup: {
    username: joi.string().required(),
    password: joi.string().required(),
    phoneNum: joi.number().required()
  }
};

router.route('/login')
  .post(validate(paramSchema.login), userController.login);

router.route('/signup')
  .post(validate(paramSchema.signup), userController.signup);

router.route('/')
  .get(userController.getUserList)

module.exports = router;
