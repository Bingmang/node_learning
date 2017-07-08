// 实现Transform流对象

var stream = require('stream');

class JSONObjectStream extends stream.Transform{
    constructor(opt) {
        super(opt);
    }
    _transform(data, encoding, callback) {
        var object = data ? JSON.parse(data.toString()) : "";
        this.emit('object', object);
        object.handled = true;
        this.push(JSON.stringify(object));
        callback();
    }
    _flush(callback) {
        callback();
    }
}

var tc = new JSONObjectStream();
tc.on('object', function (object) {
    console.log("Name: %s", object.name);
    console.log("Color: %s", object.color);
});
tc.on('data', function (data) {
    console.log("Data: %s", data.toString());
});
tc.write('{"name":"Carolinus", "color": "Green"}');