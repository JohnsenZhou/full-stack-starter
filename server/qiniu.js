const qiniu = require('qiniu');
const express = require('express');
const router = express.Router();

const accessKey = 'sgQPiNDsYCVMSsSwWlnOQ_-ezKPZmFRhxMfb9af9';
const secretKey = 'dttIbTlTaOoSuW2vYqdtn1lkKemrVvC8EGbuV5uc';

router.use('/', (req, res) => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const putPolicy = new qiniu.rs.PutPolicy({scope: 'johnsendb'});
  const uptoken = putPolicy.uploadToken(mac);

  res.json({
    uptoken
  })
})

module.exports = router;
