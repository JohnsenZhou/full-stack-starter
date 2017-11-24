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
  let { catalog } = req;

  catalog.name = name;
  catalog.phoneNum = phoneNum;
  catalog.avator = avator;
  catalog.age = age;
  catalog.address = address;
  catalog.birthday = birthday;
  catalog.email = email;
  catalog.company = company;
  catalog.updatedAt = new Date();


  Catalog.update({_id: catalog._id}, catalog, null, () => {
    Catalog.getById(catalog._id).then(item => {
      res.json({
        success: true,
        data: item
      })
    })
  })
}

function removeItem(req, res, next) {
  const catalog = req.catalog;

  Catalog.remove({_id: catalog._id}, (err, lists) => {
    console.log(lists);
    if (err) {
      res.json({
        success: false,
        errMsg: "删除失败"
      })
    } else {
      res.json({
        success: true,
        msg: "删除成功"
      })
    }
  })
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
    .catch(e => next(e));
  })
  .catch(e => next(e));
}

module.exports = {
  create, update, removeItem, itemLoading, getItemById, getList
}
