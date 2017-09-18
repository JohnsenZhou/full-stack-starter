const express = require('express');
const joi = require('joi');
const validate = require('express-validation');
const userController = require('../controllers/user.controller');
const config = require('../../config');

const router = express.Router();

const paramSchema  = {
  login: {
    body: {
      username: joi.string().required(),
      password: joi.string().required()
    }
  }
};

router.route('/login')
  .post(validate(paramSchema.login), userController.login);

module.exports = router;
