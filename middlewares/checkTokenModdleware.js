const jwt = require("jsonwebtoken");        // 导入jwt
const {secret} = require("../config/config");    // 读取配置项
// 检测登录的中间件
module.exports = (req, res, next) => {
    let token = req.get("token");
    if (!token) { // 如果没有传递token
        return res.json({ code: '20003', msg: "token 缺失", data: null })
    } else {
        jwt.verify(token, secret, (err, data) => {
            if (err) {
                // 校验失败了
                return res.json({ code: '20004', msg: "token 校验失败~~", data: null })
            }
            // 保存用户的信息
            req.user = data;
            // 这里就是校验成功了
            console.log(data);  // token里面保存的信息
            next();
        })
    }
}