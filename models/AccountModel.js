// 导入 mongoose
const mongoose = require("mongoose");
// 创建文档的结构对象
// 设置集合中文档的属性以及属性值的类型
let AccountSchema = new mongoose.Schema({
    title: {    // 标题
        type: String,
        required: true
    },
    time:Date,  // 时间
    type:{  // 类型
        type: Number,
        default: -1
    },
    account: {  // 金额
        type: Number,
        required: true
    },
    remarks: String  // 备注
});
// 创建模型对象 对文档操作的封装对象
// 将这个对象暴漏出去           // Account 这里的集合名称 等到创建集合的时候会使用它的复数形式。 Accounts
module.exports = mongoose.model("account", AccountSchema);
