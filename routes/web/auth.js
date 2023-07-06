var express = require('express');
var router = express.Router();
const UserModel = require("../../models/UserModel");
const md5 = require("md5");

// 注册
router.get("/reg",(req, res)=>{
    // 响应 HTML 内容
    res.render("auth/reg");
})

router.post("/reg",(req, res)=>{
    console.log(req.body,md5(req.body.password));
    UserModel.create({...req.body,password:md5(req.body.password)}).then(data=>{
        res.render("success",{msg:"注册成功",url:'/login'});
    }).catch(error=>{
        console.log(error);
        res.status(500).send("注册失败");
    })
})

// 登录
router.get("/login",(req, res)=>{
    // 响应 HTML 内容
    res.render("auth/login");
})
//  登录操作
router.post("/login",(req, res)=>{
    let {username, password} = req.body;
    console.log(username, password ,md5(password) )
    // 根据用户名和密码去查询数据库
    UserModel.findOne({username: username, password:md5(password.toString())}).then(data=>{
        if(data){
            // 这里需要写入session
            req.session.username = data.username;
            req.session._id = data._id;
            // 切换页面
            res.render("success",{msg:"登录成功",url:'/account'});
        }else{
            res.send("账号或密码错误~~");
        }
    }).catch(error=>{
        console.log(error);
        res.status(500).send("登录失败");
    })
})
// 退出登录
router.get("/logout",(req, res)=>{
    // 销毁session
    req.session.destroy(()=>{
        res.render("success",{msg:"退出成功",url:"/login"});
    })
})
module.exports = router;
