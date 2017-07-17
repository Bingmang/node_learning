var child_process = require('child_process');
var child1 = child_process.fork('child.js');
var child2 = child_process.fork('child.js');

var server = require('net').createServer();
// 所有请求都由子进程处理
server.listen(8080, function () {
    child1.send('server', server);
    child2.send('server', server);
    //关掉
    server.close();
});