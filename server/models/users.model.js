const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = global.Promise;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createAt: {
    type: Number,
    min: 5,
    max: 99
  },
  updatedAt: {
    type: Date
  }
})

UserSchema.statics = {
  /**
   * 通过name搜索user
   * 
   * @param {any} name
   * @returns 
   */
  getByName(name) {
    return this.findOne({username: name})
      .exec()
      .then(user => {
        if (user) {
          return user
        } else {
          const err = new Error("Can't found user");
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

module.exports = mongoose.model('User', UserSchema);
