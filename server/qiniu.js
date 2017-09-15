const qiniu = require('qiniu');
const express = require('express');
const router = express.Router();

qiniu.conf.ACCESS_KEY = 'sgQPiNDsYCVMSsSwWlnOQ_-ezKPZmFRhxMfb9af9';
qiniu.conf.SECRET_KEY = 'dttIbTlTaOoSuW2vYqdtn1lkKemrVvC8EGbuV5uc';

router.use('/', (req, res) => {
  const putPolicy = new qiniu.rs.putPolicy('johnsendb');
  const uptoken = putPolicy.token();

  res.json({
    uptoken
  })
})

module.exports = router;
