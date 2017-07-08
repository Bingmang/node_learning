// 实现基本的GET Web服务器

const http = require('http');

var messages = [
    'Hello World',
    '这是Unicode字段',
    'From a basic Node.js server',
    'Take Luck'
];

http.createServer(function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.write('<html><head><title>这是动态GET服务器</title></head></html>');
    res.write('<body>');
    for (let idx in messages) {
        res.write('\n<h1>' + messages[idx] + '</h1>');
    }
    res.end('\n</body></html>');
}).listen(8080);