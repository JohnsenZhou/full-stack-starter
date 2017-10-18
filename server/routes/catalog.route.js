const express = require('express');
const validate = require('express-validation');
const joi = require('joi');
const catalogController = require('../controllers/catalog.controller');

const router = express.Router();

const paramSchema = {
  
}

router.route('/')
  .post(catalogController.create);

module.exports = router;
