// 检测登录的中间件
module.exports = (req, res, next) => {
    if (req.session.username) { // 判断是否登陆了
        next();
    } else {
        res.redirect("/login");
    }
}