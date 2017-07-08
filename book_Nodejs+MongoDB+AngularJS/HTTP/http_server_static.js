// HTTP Server对象 - 静态文件服务器
/*
 *  http.ClientRequest -> Writable流
 *  http.ServerResponse -> Writable流
 *  http.IncomingMessage -> Readable流
 *  HTTP Server -> EventEmitter
*/


const fs = require('fs');
const http = require('http');
const url = require('url');

// req-> IncomingMessage对象，代表客户端请求    res-> ServerResponse对象，用来制定和发送响应
http.createServer(function (req, res) {
    // url.parse(urlStr, [parseQueryString], [slashesDenoteHost]) 把URL字符串转换为URL对象 P110
    // 属性：href protocol host auth hostname port pathname search path query hash 
    var urlObj = url.parse(req.url, true, false);
    console.log('检测到请求: ', req.url);
    fs.readFile(__dirname + urlObj.pathname, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(8080);