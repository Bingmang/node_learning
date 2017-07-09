// 一个主进程，它最多创建4个工作进程, 实现了一个基本的HTTP服务器集群
const cluster = require('cluster');
const http = require('http');
if (cluster.isMaster) {
    cluster.on('fork', function (worker) {
        console.log("您有一位新工人: ", worker.id);
    });
    cluster.on('listening', function (worker, address) {
        console.log("工人: " + worker.id + " 正在监听 " + address.address + ":" + address.port);
    });
    cluster.on('exit', function (worker, code, signal) {
        console.log("有个工人退出啦: ", worker.id);
    });
    // 调用setupMaster(), 指定工作进程可执行的cluster_worker.js
    cluster.setupMaster({ exec: 'cluster_worker.js' });
    // 调用cluster.fork()创建工作进程
    var numCPUs = require('os').cpus().length;
    for (let i = 0; i < numCPUs; i++){
        if (i >= 4) break;
        cluster.fork();
    }
    // 遍历工作进程，为每一个工作进程注册message事件处理程序
    Object.keys(cluster.workers).forEach(function (id) {
        cluster.workers[id].on('message', function (message) {
            console.log("工人说话了: ", message);
        });
    });
}