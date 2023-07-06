"use strict";

/*
*   success：数据库连接成功的回调
*   error：数据库连接失败的回调
*/
module.exports = function (success, error) {
  // 1：安装 mongoose
  // 2：导入 mongoose
  var mongoose = require("mongoose"); // 设置 strictQuery为true


  mongoose.set("strictQuery", true); // 3：链接 mongodb服务

  mongoose.connect("mongodb://127.0.0.1:27017/bilibili"); // 4：设置回调
  // 设置连接成功的回调  官方建议使用once来绑定

  mongoose.connection.once("open", function () {
    // 5：创建文档的结构对象
    success(mongoose);
  }); // 设置连接错误的回调

  mongoose.connection.on("error", function () {
    console.log("连接失败");
    error();
  }); // 设置连接关闭的回调

  mongoose.connection.on("close", function () {
    console.log("连接关闭");
  });
};