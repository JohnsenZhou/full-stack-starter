const User = require('../models/user.model');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config');
const verifyToken = require('../middlewares/tokenCheck');

/**
 * Returns token when login successfully
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
function login(req, res, next) {
  const { password, phoneNum } = req.body;

  User.checkUser(phoneNum).then(user => {
    if (user) {
      if (user.password === password) {
        // generator user token, expires: 7 days
        const token = jsonwebtoken.sign({
          userId: user._id
        }, config.jwtSecret, { expiresIn: '7d' });

        res.json({
          success: true,
          data: {
            token
          }
        })
      }
      
    } else {
      res.json({
        success: false,
        errMsg: "用户不存在"
      })
    }
  })

}

/**
 * sign up a account
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} next 
 */
function signup(req, res, next) {
  const { username, password, phoneNum } = req.body;
  const newUser = new User({
    username,
    password,
    phoneNum
  })
  
  User.checkUser(phoneNum).then(user => {
    // console.log(user);
    if (user) {
      return res.json({
        success: false,
        msg: "用户已存在"
      })
    } else {
      newUser.save()
        .then(() => {
          res.json({
            success: true,
            msg: "用户注册成功"
          })
        })
    }
  })
}


function getUserList(req, res, next) {
  const { limit, page } = req.query;
  const skip = (~~page - 1) * limit > 0 ? (~~page - 1) * limit : 0;

  User.find().then(totalList => {
    User.findUserList({limit: ~~limit, skip}).then(lists => {
      res.json({
        success: true,
        page: { current: page, total: totalList.length },
        data: lists
      });
    })
    .catch(e => next(e));
  })
  .catch(e => next(e));
}

module.exports = {
  login, signup, getUserList
};
