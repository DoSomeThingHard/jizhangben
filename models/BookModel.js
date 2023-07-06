// 导入 mongoose
const mongoose = require("mongoose");
// 创建文档的结构对象
// 设置集合中文档的属性以及属性值的类型
let BookSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    author: String,
    price: Number,
    is_hot: Boolean,
    tags: Array,
    pub_time:Date,
    test:mongoose.Schema.Types.Mixed
});
// 创建模型对象 对文档操作的封装对象
// 将这个对象暴漏出去
module.exports = mongoose.model("books", BookSchema);
