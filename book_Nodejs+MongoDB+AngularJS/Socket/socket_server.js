// 实现基本的TCP套接字服务器

const net = require('net');
const server = net.createServer(function (client) {
    console.log('客户端连接啦： ');
    console.log('    local = %s:%s', client.localAddress, client.localPort);
    console.log('    remote= %s:%s', client.remoteAddress, client.remotePort);
    client.setTimeout(500);
    client.setEncoding('utf8');
    client.on('data', function (data) {
        console.log('收到数据啦，来自 %d: %s', client.remotePort, data.toString());
        console.log('    收到字节数：', client.bytesRead);
        writeData(client, '服务器发送数据啦：' + data.toString());
        console.log('    发送字节数：', client.bytesWritten);
    });
    client.on('end', function () {
        console.log('客户端断开啦!');
        server.getConnections(function (err, count) {
            console.log('剩余连接数：', count);
        });
    });
    client.on('error', function (err) {
        console.log('Socket出错啦: ', JSON.stringify(err));
    });
    client.on('timeout', function () {
        console.log('Socket超时啦!');
    });
});
server.listen(8107, function () {
    console.log('服务器监听了：', JSON.stringify(server.address()));
    server.on('close', function () {
        console.log('服务器关闭啦!');
    });
    server.on('error', function (err) {
        console.log('服务器出错啦: ', JSON.stringify(err));
    });
});

// 写入数据失败时（缓冲区为空），则监听drain事件并重新写入，用闭包保存变量
function writeData(socket, data) {
    var success = !socket.write(data);
    if (!success) {
        (function (socket, data){
            socket.once('drain', function () {
                writeData(socket, data);
            });
        })(socket, data);
    }
}