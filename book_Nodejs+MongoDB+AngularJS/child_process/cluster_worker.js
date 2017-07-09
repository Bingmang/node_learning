// 一个工作进程，实现了HTTP服务器

const cluster = require('cluster');
const http = require('http');
if (cluster.isWorker) {
    http.createServer(function (req, res) {
        res.writeHead(200);
        res.end('进程: ' + process.pid + " 相应了请求说了声你好");
        process.send("进程: " + process.pid + " 对一个请求打了招呼");
    }).listen(8080, function () {
        console.log("子服务器工人在进程上跑起来啦: ", process.pid);
    });
};