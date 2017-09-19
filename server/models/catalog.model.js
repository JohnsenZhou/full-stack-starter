const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = global.Promise;

const CatalogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avator: {
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    min: 5,
    max: 99
  },
  address: {
    type: String
  },
  birthday: {
    type: String
  },
  email: {
    type: String
  },
  company: {
    type: String
  },
  relative: {
    type: String
  }
})
