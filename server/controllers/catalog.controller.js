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

function update(req, res, next) {
  const { name, phoneNum, avator, age, address, birthday, email, company } = req.body;
  const id = req.params.catalogId;
  let { catalog } = req;

  catalog = {
    name, phoneNum, avator, age, address, birthday, email, company
  }
  // catalog.name = name;
  // catalog.phoneNum = phoneNum;
  // catalog.avator = avator;
  // catalog.age = age;
  // catalog.address = address;
  // catalog.birthday = birthday;
  // catalog.email = email;
  // catalog.company = company;

  Catalog.update({_id: {$gt: id}}, catalog, null, () => {
    res.json({
      success: true,
      data: catalog
    })
  })

  // catalog.save().then(() => {
  //   res.json({
  //     success: true,
  //     data: catalog
  //   })
  // })
  // .catch(err => next(err));

}

function itemLoading(req, res, next, id) {
  Catalog.getById(id).then(catalog => {
    req.catalog = catalog;
    return next();
  }).catch(err => next(err))
}

function getItemById(req, res) {
  return res.json({success: true, data: req.catalog})
}

function getList(req, res, next) {
  const { limit, page } = req.query;
  console.log(limit, page);

  Catalog.find().then(totalList => {
    Catalog.findList({limit: ~~limit, skip: (~~page - 1) * limit}).then(lists => {
      res.json({
        success: true,
        page: { current: page, total: totalList.length },
        data: lists
      });
    })
  })
  .catch(e => next(e));;
}

module.exports = {
  create, update, itemLoading, getItemById, getList
}
