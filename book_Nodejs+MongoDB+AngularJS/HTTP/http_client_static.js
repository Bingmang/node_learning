// http.ClientRequest对象 - 一个基本的Web客户端检索静态文件

const http = require('http');

var options = {
    hostname: 'localhost',
    port: '8080',
    path: '/hello.html'
};

// response -> IncommingMessage对象
function handleResponse(response) {
    var serverData = '';
    response.on('data', function (chunk) {
        serverData += chunk;
    });
    response.on('end', function () {
        console.log("DataEnd: ", serverData);
    });
}
// http.ClientRequest对象
http.request(options, function (response) {
    handleResponse(response);
}).end();