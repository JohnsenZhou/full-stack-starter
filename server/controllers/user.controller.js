const User = require('../models/user.model');
const jsonwebtoken = require('jsonwebtoken'); // token
const config = require('../../config');

/**
 * Returns token when login successfully
 * @param {any} req
 * @param {any} res
 * @param {any} next
 * @returns
 */
function login(req, res, next) {
  const { username, password, phoneNum } = req.body;

  if (username === user.username && password === user.password) {
    const token = jsonwebtoken.sign({
      username
    }, config.jwtSecret);

    return res.json({
      success: true,
      data: {
        token,
        username
      }
    })
  } else {
    res.json({
      success: false
    })
  }

  const err = new Error('check username or password');
  return next(err);
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
  
  User.checkUser({username, phoneNum}).then(user => {
    console.log(user);
    if (user.length) {
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

module.exports = {
  login, signup
};
