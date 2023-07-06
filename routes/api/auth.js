var express = require('express');
var router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");
const jwt = require("jsonwebtoken");        // 导入jwt
const {secret} = require("../../config/config");   // 导入并使用配置项

//  登录操作
router.post("/login", (req, res) => {
    let { username, password } = req.body;
    console.log(username, password ,md5(password) )
    // 根据用户名和密码去查询数据库
    UserModel.findOne({ username: username, password: md5(password.toString()) }).then(data => {
        if (data) {
            // 创建（生成）token
            let token = jwt.sign({
                username: data.username,
                _id : data._id
            }, secret, {
                expiresIn: 60,     // 单位是秒
            })
            res.json({code: "0000",msg: "登录成功",data: token})
        } else {
            res.json({code: '20002',msg: '账号或密码错误~~',data: null})
        }
    }).catch(error => {
        res.json({code: '20001',msg: '数据库读取失败~~',data: null})
    })
})
// 退出登录
router.get("/logout", (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render("success", { msg: "退出成功", url: "/login" });
    })
})
module.exports = router;


