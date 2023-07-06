"use strict";

// 1：安装 mongoose
// 2：导入 mongoose
var mongoose = require("mongoose"); // 设置 strictQuery为true


mongoose.set("strictQuery", true); // 3：链接 mongodb服务

mongoose.connect("mongodb://127.0.0.1:27017/bilibili"); // 4：设置回调
// 设置连接成功的回调  官方建议使用once来绑定

mongoose.connection.once("open", function () {
  // console.log("连接成功");
  // 5：创建文档的结构对象
  // 设置集合中文档的属性 以及属性值的类型
  var BookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    author: String,
    price: Number,
    is_hot: Boolean,
    tags: Array,
    pub_time: Date,
    test: mongoose.Schema.Types.Mixed
  }); // 6：创建模型对象

  var BookModel = mongoose.model("books", BookSchema); // 7：读取

  BookModel.find().skip(1).limit(1).then(function (data) {
    console.log(data); // 8：关闭数据库链接(项目运行过程中，不会经常关闭数据库的链接)

    mongoose.disconnect();
  })["catch"](function (error) {
    console.log("报错了", error);
  });
}); // 设置连接错误的回调

mongoose.connection.on("error", function () {
  console.log("连接失败");
}); // 设置连接关闭的回调

mongoose.connection.on("close", function () {
  console.log("连接关闭");
});