// 导入 mongoose
const mongoose = require("mongoose");
// 创建文档的结构对象
// 设置集合中文档的属性以及属性值的类型
let UserSchema = new mongoose.Schema({
    username: {    
        type: String,
        required: true
    },
    password: {    
        type: String,
        required: true
    }
});
// 创建模型对象 对文档操作的封装对象
// 将这个对象暴漏出去           // Account 这里的集合名称 等到创建集合的时候会使用它的复数形式。 Accounts
module.exports = mongoose.model("user", UserSchema);
