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

module.exports = {
  login
};
