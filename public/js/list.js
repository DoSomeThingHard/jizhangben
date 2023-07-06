window.onload = function () {
    let deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach(item => {
        item.onclick = function (e) {
            // 返回 true就是可以响应默认行为  返回false就是不响应默认行为
            if (confirm(`您确定要删除${item.dataset.title}吗?`)) {
                return true;    // 返回true 响应默认的事件
            } else {
                e.preventDefault();
            }
        }
    })
}