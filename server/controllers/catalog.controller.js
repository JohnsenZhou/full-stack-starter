const Catalog = require('../models/catalog.model');

function create(req, res, next) {
  const { name, phoneNum, avator, age, address, birthday, email, company } = req.body;
  console.log(req.body)
  const newCatalog = new Catalog({
    name,
    phoneNum,
    avator,
    age,
    address,
    birthday,
    email,
    company
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
