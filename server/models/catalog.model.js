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
  /**
   * 通过Id搜索Catalog
   * 
   * @param {any} id 
   * @returns 
   */
  getById(id) {
    return this.findOne({_id: id})
      .exec()
      .then(list => {
        if (list) {
          return list
        } else {
          const err = new Error("Can't found this catalog");
          return Promise.reject(err);
        }
      })
  },
  
  /**
   * 分页查询：query:{skip,limit}，limit:每页数量；skip：跳过多少条目
   * 
   * @param {any} query 
   * @returns 
   */
  findList(query) {
    return this.find()
      .sort()
      .skip(query.skip)
      .limit(query.limit)
      .exec();
  }
}

module.exports = mongoose.model('Catalog', CatalogSchema);
