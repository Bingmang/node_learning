// 实现一个Readable流对象

var stream = require('stream');
var util = require('util');
util.inherits(Answers, stream.Readable);

function Answers(opt) {
    stream.Readable.call(this, opt);
    this.quotes = ["yes", "no", "maybe"];
    this._index = 0;
}

Answers.prototype._read = function () {
    if (this._index > this.quotes.length) {
        // QUES: 调用push()来输出Readable对象中的数据的_read()方法，推入的是一个String、Buffer或者null 
        // 数据已枯竭，调用push(null)通知数据流
        this.push(null);
    } else {
        // 通过push(data)将数据添加到流中
        this.push(this.quotes[this._index]);
        this._index += 1;
    }
};

var r = new Answers();
console.log("Direct read: " + r.read().toString());
// 当数据的事件处理程序被连接时，流被转变成流动的模式，并且数据处理程序被连续的调用，直到所有数据都被用尽。
r.on('data', function (data) {
    console.log("Callback read: " + data.toString());
});
r.on('end', function (data) {
    console.log("No more answers.");
});