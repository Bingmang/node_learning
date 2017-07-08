// 实现Duplex流对象

var stream = require('stream');

class Duplexer extends stream.Duplex{
    constructor(opt) {
        super(opt);
        this.data = [];
    }
    _read(size) {
        var chunk = this.data.shift();
        if (chunk == "stop") {
            // push是将数据推入Readable，会触发data事件
            this.push(null);
        } else {
            if (chunk) {
                this.push(chunk);
            } else {
                setTimeout(readItem.bind(this), 500, size);
            }
        }
    }
    _write(data, encoding, callback) {
        this.data.push(data);
        callback();
    }
};

var d = new Duplexer();
d.on('data', (chunk) => {
    console.log('read: ', chunk.toString());
});
d.on('end', () => {
    console.log('Message Complete');
});
d.write("I think, ");
d.write("therefore ");
d.write("I am.");
d.write("Rene Descartes");
d.write("stop you motherfucker!");
d.write("stop");