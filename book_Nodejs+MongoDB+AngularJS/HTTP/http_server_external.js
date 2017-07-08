// 实现远程连接到外部天气数据源的HTTP Web服务

const http = require('http');
const url = require('url');
const qstring = require('querystring');

// weatherData -> String    res -> ServerResponse(Writable)
function sendResponse(weatherData, res) {
    var page = '<html><head><title>External Example</title></head>' +
        '<body>' +
        '<form method="post">' +
        'City: <input name="city"><br>' +
        '<input type="submit" value="Get Weather">' +
        '</form>';
    if (weatherData) {
        page += '<h1>Weather Info</h1><p>' + weatherData + '</p>';
    }
    page += '</body></html>';
    res.end(page);
}
// weatherResponse -> IncomingMessage(Readable)    res -> ServerResponse(Writable)
function parseWeather(weatherResponse, res) {
    var weatherData = '';
    weatherResponse.on('data', function (chunk) {
        weatherData += chunk;
    });
    weatherResponse.on('end', function () {
        sendResponse(weatherData, res);
    });
}
// 实现对openweathermap.org的客户端请求
// city -> String    res -> ServerResponse(Writable)
function getWeather(city, res) {
    var options = {
        host: 'api.openweathermap.org',
        path: '/data/2.5/weather?q=' + city
    };
    // weatherResponse -> IncomingMessage(Readable)
    http.request(options, function (weatherResponse) {
        // 处理程序读取来自openweathermap.org的响应并把数据传递到sendResponse()函数完成响应
        parseWeather(weatherResponse, res);
    }).end();
}
// req -> IncomingMessage(Readable)    res -> ServerResponse(Writable)
http.createServer(function (req, res) {
    console.log(req.method);
    if (req.method == "POST") {
        var reqData = '';
        req.on('data', function (chunk) {
            reqData += chunk;
        });
        req.on('end', function () {
            var postParams = qstring.parse(reqData);
            getWeather(postParams.city, res);
        });
    } else {
        sendResponse(null, res);
    }
}).listen(8080);