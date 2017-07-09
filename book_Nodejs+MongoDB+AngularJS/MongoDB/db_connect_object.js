const MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;
const async = require('async');
var db = new MongoClient(new Server(
    'localhost', 27017,
    {
        socketOptions: { connectTimeoutMS: 500 },
        poolSize: 5,
        auto_reconnect: true
    },
    {
        numberOfRetries: 3,
        retryMilliSeconds: 500
    }));
async.waterfall([
    function (callback) {
        db.open(function (err, db) {
            callback(err, db);
        });
    },
    function (db, callback) {
        
    }
],)