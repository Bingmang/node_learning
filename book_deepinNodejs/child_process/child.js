var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('由你儿子处理啦，PID是', process.pid, '\r\n');
});
console.log('老子开始工作了');
process.on('message', function (message, tcp) {
    if (message === 'server') {
        tcp.on('connection', function (socket) {
            server.emit('connection', socket);
        });
    }
});