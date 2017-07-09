var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost/", function (err, db) {
    var myDB = db.db("words");
    myDB.collection("word_stats", findItems);
    setTimeout(function () {
        db.close();
    }, 3000);
});

function displayWords(msg, cursor, pretty) {
    cursor.toArray(function (err, itemArr) {
        console.log("\n" + msg);
        var wordList = [];
        for (var i = 0; i < itemArr.length; i++) {
            wordList.push(itemArr[i].word);
        }
        console.log(JSON.stringify(wordList, null, pretty));
    });
}

function findItems(err, words) {
    words.find({ first: { $in: ['a', 'b', 'c'] } }, function (err, cursor) {
        displayWords("单词以a, b, c开头的有: ", cursor);
    });
    words.find({ size: { $gt: 12 } }, function (err, cursor) {
        displayWords("单词长度大于12个字符的: ", cursor);
    });
    words.find({ size: { $mod: [2, 0] } }, function (err, cursor) {
        displayWords("单词长度是偶数的: ", cursor);
    });
    words.find({ letters: { $size: 12 } }, function (err, cursor) {
        displayWords("单词长度等于12个字符的: ", cursor);
    });
    words.find({
        $and: [
            { first: { $in: ['a', 'e', 'i', 'o', 'u'] } },
            { last: { $in: ['a', 'e', 'i', 'o', 'u'] } }
        ]
    },
        function (err, cursor) {
            displayWords("单词以元音字母开头结尾的: ", cursor);
        });
    words.find({ "stats.vowels": { $gt: 6 } }, function (err, cursor) {
        displayWords("Words containing 7 or more vowels: ", cursor);
    });
    words.find({ letters: { $all: ['a', 'e', 'i', 'o', 'u'] } },
        function (err, cursor) {
            displayWords("单词有五个元音字母的: ", cursor);
        });
    words.find({ otherChars: { $exists: true } }, function (err, cursor) {
        displayWords("Words with non-alphabet characters: ", cursor);
    });
    words.find({
        charsets: {
            $elemMatch: {
                $and: [{ type: 'other' },
                { chars: { $size: 2 } }]
            }
        }
    },
        function (err, cursor) {
            displayWords("Words with 2 non-alphabet characters: ", cursor);
        });
}