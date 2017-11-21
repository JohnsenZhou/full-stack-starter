const express = require('express');
const validate = require('express-validation');
const joi = require('joi');
const catalogController = require('../controllers/catalog.controller');

const router = express.Router();

const paramSchema = {
  createCatalog: {
    body: {
      name: joi.string(),
      phoneNum: joi.number(),
      avator: joi.string(),
      age: joi.number(),
      address: joi.string(),
      birthday: joi.string(),
      email: joi.string().email(),
      company: joi.string()
    }
  }
}

router.route('/')
  .get(catalogController.findAll)
  .post(validate(paramSchema.createCatalog), catalogController.create);

module.exports = router;
