const Catalog = require('../models/catalog.model');

function create(req, res, next) {
  const { name, phoneNum } = req.body;
  console.log(req.body)
  const newCatalog = new Catalog({
    name,
    phoneNum
  });

  newCatalog.save()
    .then(() => {
      res.json({
        success: true
      })
    })
    .catch(err => next(err));
}

module.exports = {
  create
}