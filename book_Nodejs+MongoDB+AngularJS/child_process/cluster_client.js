// 一个HTTP客户端，发送一系列的请求来测试服务器

const http = require('http');

var options = {
    port: '8080'
};
function sendRequest() {
    // res->http.IncomingMessage对象
    http.request(options, function (res) {
        var serverData = '';
        res.on('data', (chunk) => {
            serverData += chunk;
        });
        res.on('end', () => {
            console.log('从服务器收到数据: ', serverData);
        });
    }).end();
}
for (let i = 0; i < 3; i++){
    console.log("发送请求中");
    sendRequest();
}