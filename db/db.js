/*
*   success：数据库连接成功的回调
*   error：数据库连接失败的回调
*/
module.exports = function(success, error){
    // 判断error没传的情况,为其设置一个默认值
    if(typeof error !== "function"){
        error = ()=>{
            console.log("链接失败");
        };
    }
    // 1：安装 mongoose
    // 2：导入 mongoose
    const mongoose = require("mongoose");
    const {DBHOST, DBPORT, DBNAME} = require("../config/config")
    // 设置 strictQuery为true
    mongoose.set("strictQuery", true);
    // 3：链接 mongodb服务
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`);
    // 4：设置回调
    // 设置连接成功的回调  官方建议使用once来绑定
    mongoose.connection.once("open",()=>{
        // 5：创建文档的结构对象
        success(mongoose);
    });  
    // 设置连接错误的回调
    mongoose.connection.on("error",()=>{
        console.log("连接失败");
        error();
    });  
    // 设置连接关闭的回调
    mongoose.connection.on("close",()=>{
        console.log("连接关闭");
    });  
}