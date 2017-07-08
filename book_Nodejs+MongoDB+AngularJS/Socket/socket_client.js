// 实现基本TCP套接字客户端

const net = require('net');

// 创建客户端Socket connName->String 
function getConnection(connName) {
    // net.connect 创建一个Socket对象 net.connect(port, [host], [connectListener])
    var client = net.connect({ port: 8107, host: 'localhost' }, function () {
        console.log(connName + ' Connected: ');
        console.log('    local = %s:%s', this.localAddress, this.localPort);
        console.log('    remote= %s:%s', this.remoteAddress, this.remotePort);
        // 添加超时时间 设置编码
        this.setTimeout(500);
        this.setEncoding('utf8');
        this.on('data', function (data) {
            console.log(connName + " From Server: " + data.toString());
            this.end();
        });
        this.on('error', function (err) {
            console.log('Socket Error: ', JSON.stringify(err));
        });
        this.on('timeout', function () {
            console.log('Socket Timed Out');
        });
        this.on('close', function () {
            console.log('Socket Closed');
        });
    });
    return client;
}
function writeData(socket, data) {
    var success = !socket.write(data);
    // 当写入失败时，实现drain事件处理程序，以在缓冲区为空时重新开始写入，一旦函数结束，就用一个闭包来保存套接字和数据变量的值
    if (!success) {
        // 使用闭包保存socket和data的值
        (function (socket, data) {
            socket.once('drain', function () {
                writeData(socket, data);
            });
        })(socket, data);
    }
}

var Dwarves = getConnection("Dwarves");
var Elves = getConnection("Elves");
var Hobbits = getConnection("Hobbits");
writeData(Dwarves, "我是1：More Axes");
writeData(Elves, "我是2：More Axes");
writeData(Hobbits, "我是3：More Pipe Weed");