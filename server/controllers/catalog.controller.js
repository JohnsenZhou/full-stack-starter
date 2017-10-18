const Catalog = require('../models/catalog.model');

function create(req, res, next) {
  const { name, phoneNum } = req.body;
  const newCatalog = new Catalog({
    name,
    phoneNum
  });

  newCatalog.save()
    .catch(err => next(err));
}

module.exports = {
  create
}