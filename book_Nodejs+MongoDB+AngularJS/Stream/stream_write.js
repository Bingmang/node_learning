// 实现一个Writable流对象

var stream = require('stream');
var util = require('util');

class Writer extends stream.Writable{
    constructor(opt) {
        super(opt);
        this.data = new Array();
    }
    _write(data, encoding, callback) {
        this.data.push(data.toString('utf8'));
        console.log("Adding: " + data);
        callback();
    }
}

var w = new Writer();
for (let i = 1; i <= 5; i++){
    w.write("Item" + i, 'utf8');
}
w.end("ItemLast");
console.log(w.data);