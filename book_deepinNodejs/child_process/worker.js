var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('子进程开始测试啦\r\n');
}).listen(Math.round((1 + Math.random()) * 1000), '127.0.0.1', function () {
    console.log('我开始监听咯！');
});
// 监听1000到2000之间的一个随机端口