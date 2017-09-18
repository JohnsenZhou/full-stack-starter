const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const catalogRouter = require('./catalog.route')

router.use('/user', userRouter);
router.use('/catalogs', catalogRouter);

module.exports = router;
