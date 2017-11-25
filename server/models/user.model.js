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
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
})

UserSchema.statics = {
  /**
   * 通过手机号或用户名搜索user
   * 
   * @param {any} query 
   * @returns 
   */
  checkUser(query) {
    return this.find()
      .or([{username: query.username}, {phoneNum: query.phoneNum}])
      .exec()
  },
  
  /**
   * 分页查询：query:{skip,limit}，limit:每页数量；skip：跳过多少条目
   * 
   * @param {any} query 
   * @returns 
   */
  findUserList(query) {
    console.log(query)
    return this.find()
      .sort()
      .skip(query.skip)
      .limit(query.limit)
      .exec();
  }
}

module.exports = mongoose.model('User', UserSchema);
