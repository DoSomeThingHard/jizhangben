var express = require('express');
var router = express.Router();

// // 导入 lowdb
// const low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync(__dirname + '/../../data/db.json') // 新建一个文件
// // 获取db对象
// const db = low(adapter)
// // 导入 shortid
// const shortid = require("shortid");

// 导入 moment
const moment = require("moment");
const AccountModel = require('../../models/AccountModel');

// 声明中间件检测登录
let checkLoginModdleware = require("../../middlewares/checkLoginModdleware")

// 添加首页的路由规则
router.get("/", (req, res)=>{
  // 重定向到 account页面
  res.redirect("/account");
})

// 记账本的列表
router.get('/account', checkLoginModdleware, function (req, res, next) {
  // 获取所有的账单信息
  // let accounts = db.get("accounts").value();
  //  res.render("list", {accounts});
  
    // 读取数据库的数据
    AccountModel.find().sort({ time: -1 }).then(accounts => {
      res.render("list", { accounts, moment });
    }).catch(error => {
      res.status(500).send('读取失败~~');
    })

});
// 添加记录
router.get('/account/create', checkLoginModdleware, function (req, res, next) {
  res.render("create");
});
// 新增记录
router.post('/account', checkLoginModdleware, function (req, res, next) {
  // 获取请求体的数据
  console.log(req.body);
  // // 生成id
  // let id = shortid.generate();
  // // 写入文件 新的数据插入前面
  // db.get("accounts").unshift({id, ...req.body}).write();
  // res.render("success",{msg:"添加成功", url:'/account'});

  // 插入数据库
  AccountModel.create({
    ...req.body,
    // 修改 time 属性的值 将他转为Date类型
    time: moment(req.body.time).toDate()
  }).then(data => {
    // 展示添加成功的页面
    res.render("success", { msg: "添加成功", url: '/account' });
  }).catch(error => {
    res.status(500).send('插入失败~~');
  })

});
// 删除记录
router.get('/account/:id', checkLoginModdleware, function (req, res, next) {
  // 获取 params 的 id 参数
  let id = req.params.id;
  // // JSON文件的删除
  // db.get("accounts").remove({id}).write();
  // // 展示添加成功的页面
  // res.render("success",{msg:"删除成功", url:'/account'});

  // 数据库的删除
  AccountModel.deleteOne({ _id: id }).then(data => {
    res.render("success", { msg: "删除成功", url: '/account' });
  }).catch(error => {
    res.status(500).send('删除失败~~');
  })

});

module.exports = router;
