const stream = require('stream');

class Reader extends stream.Readable{
    constructor(opt) {
        super(opt);
        this._index = 1;
    }
    _read(size) {
        var i = this._index++;
        if (i > 10) {
            this.push(null);
        } else {
            this.push("Item " + i.toString());
        }
    }
}

class Writer extends stream.Writable{
    constructor(opt) {
        super(opt);
        this._index = 1;
    }
    _write(data, encoding, callback) {
        console.log(data.toString());
        callback();
    }
}
var r = new Reader();
var w = new Writer();
r.pipe(w);