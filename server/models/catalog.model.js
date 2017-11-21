const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = global.Promise;

const CatalogSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  avator: {
    type: String,
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

CatalogSchema.statics = {
  
  findList(query) {
    return this.find()
      .sort()
      .skip(query.skip)
      .limit(query.limit)
      .exec();
  }
}

module.exports = mongoose.model('Catalog', CatalogSchema);
