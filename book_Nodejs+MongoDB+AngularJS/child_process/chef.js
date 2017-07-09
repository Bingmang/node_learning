// 一个子进程，负责处理message事件和将数据发送回父进程

process.on('message', function (message, parent) {
    var meal = {};
    switch (message.cmd) {
        case '做早餐':
            meal = ["汉堡", "鸡蛋", "吐司"];
            break;
        case '做午饭':
            meal = ["汉堡", "薯条", "沙克"];
            break;
        case '做晚饭':
            meal = ["汤", "沙拉", "牛排"];
            break;
    }
    process.send(meal);
})