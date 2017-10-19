const express = require('express');
const validate = require('express-validation');
const joi = require('joi');
const catalogController = require('../controllers/catalog.controller');

const router = express.Router();

const paramSchema = {
  createCatalog: {
    body: {
      name: joi.string(),
      phoneNum: joi.number()
    }
  }
}

router.route('/')
  .post(validate(paramSchema.createCatalog), catalogController.create);

module.exports = router;
