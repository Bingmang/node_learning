const http = require('http');
var options = {
    hostname: 'localhost',
    port: '8080'
};

http.request(options, function (res) {
    var serverData = '';
    res.on('data', function (chunk) {
        serverData += chunk;
    });
    res.on('end', function () {
        console.log("Response StatusCode: ", res.statusCode);
        console.log("Response Headers: ", res.headers);
        console.log(serverData);
    });
}).end();