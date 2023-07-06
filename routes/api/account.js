var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");        // 导入jwt
// 导入 moment
const moment = require("moment");
const AccountModel = require('../../models/AccountModel');

// 中间件
let checkTokenMiddleware = require("../../middlewares/checkTokenModdleware")

// 记账本的列表
router.get('/account', checkTokenMiddleware, function (req, res) {
    console.log(req.user);  // 获取token对应的用户的信息
    // 读取数据库的数据
    AccountModel.find().sort({ time: -1 }).then(accounts => {
        res.json({ code: "0000", msg: "读取成功", data: accounts })
    }).catch(error => {
        res.json({ code: '10001', msg: '读取失败~~', data: null })
    })
});

// 新增记录
router.post('/account', checkTokenMiddleware,function (req, res) {
    // 插入数据库
    AccountModel.create({
        ...req.body,
        // 修改 time 属性的值 将他转为Date类型
        time: moment(req.body.time).toDate()
    }).then(data => {
        res.json({ code: "0000", msg: '创建成功', data: data });
    }).catch(error => {
        res.json({ code: "1002", msg: "创建失败", data: null });
    })

});
// 删除记录
router.delete('/account/:id', checkTokenMiddleware, function (req, res) {
    // 获取 params 的 id 参数
    let id = req.params.id;
    // 数据库的删除
    AccountModel.deleteOne({ _id: id }).then(data => {
        res.json({ code: "0000", msg: '删除成功', data: {} });
    }).catch(error => {
        res.json({ code: "1002", msg: "删除账单失败", data: null });
    })
});

// 获取某个账单的信息
router.get('/account/:id', checkTokenMiddleware, function (req, res) {
    // 读取数据库的数据
    let id = req.params.id;
    AccountModel.findById(id).then(data => {
        res.json({ code: "0000", msg: "读取成功", data: data })
    }).catch(error => {
        res.json({ code: '10004', msg: `${id}的信息读取失败~~`, data: null })
    })
});

// 更新账单信息
router.patch("/account/:id", checkTokenMiddleware, function (req, res) {
    let id = req.params.id;
    AccountModel.updateOne({ _id: id }, req.body).then(data => {
        // 更新完之后 再次查询
        AccountModel.findById(id).then(data => {
            res.json({ code: "0000", msg: "更新成功", data: data })
        })
    }).catch(error => {
        res.json({ code: '10005', msg: `${id}的信息更新失败~~`, data: null })
    })
})

module.exports = router;
