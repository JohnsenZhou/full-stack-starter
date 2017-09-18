const mongoose = require('mongoose');
const Promise = global.Promise;

const CatalogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avator
})
