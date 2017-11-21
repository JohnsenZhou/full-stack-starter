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

function findAll(req, res, next) {
  const { limit, page } = req.query;
  console.log(limit, page);

  Catalog.findList({limit: ~~limit, skip: (~~page - 1) * limit}).then(lists => {
    res.json({
      success: true,
      page: { current: page, total: lists.length },
      data: lists
    });
  })
  .catch(e => next(e));;
}

module.exports = {
  create, findAll
}
