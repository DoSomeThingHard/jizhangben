"use strict";

var db = require("./db/db");

db(function (mongoose) {
  console.log("链接成功");
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
}, function () {
  console.log("链接失败");
});