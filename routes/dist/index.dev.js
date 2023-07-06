"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var router = express.Router(); // 导入 lowdb

var low = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync(__dirname + '/../data/db.json'); // 新建一个文件
// 获取db对象

var db = low(adapter); // 导入 shortid

var shortid = require("shortid"); // 记账本的列表


router.get('/account', function (req, res, next) {
  // 获取所有的账单信息
  var accounts = db.get("accounts").value();
  res.render("list", {
    accounts: accounts
  });
}); // 添加记录

router.get('/account/create', function (req, res, next) {
  res.render("create");
}); // 新增记录

router.post('/account', function (req, res, next) {
  // 获取请求体的数据
  console.log(req.body); // 生成id

  var id = shortid.generate(); // 写入文件 新的数据插入前面

  db.get("accounts").unshift(_objectSpread({
    id: id
  }, req.body)).write(); // 展示添加成功的页面

  res.render("success", {
    msg: "添加成功",
    url: '/account'
  });
}); // 删除记录

router.get('/account/:id', function (req, res, next) {
  // 获取 params 的 id 参数
  var id = req.params.id; // 删除

  db.get("accounts").remove({
    id: id
  }).write(); // 展示添加成功的页面

  res.render("success", {
    msg: "删除成功",
    url: '/account'
  });
});
module.exports = router;