// 使用for循环顺序处理Promise

function getURL(URL) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open("GET", URL, true);
    req.onload = function() {
      if (req.status === 200) {
        resolve(req.responseText);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error(req.statusText));
    };
    req.send();
  });
}

var request = {
  comment: function getComment() {
    return getURL("http://azu.github.io/promises-book/json/comment.json").then(
      JSON.parse
    );
  },
  people: function getPeople() {
    return getURL("http://azu.github.io/promises-book/json/people.json").then(
      JSON.parse
    );
  }
};

function main() {
  function recordValue(results, value) {
    results.push(value);
    return results;
  }
  // 用[]来保存初始化值
  var pushValue = recordValue.bind(null, []);
  // 返回promise对象的函数的数组
  var tasks = [request.comment, request.people];
  var promise = Promise.resolve();
  // 开始的地方
  for (var i = 0; i < tasks.length; i++) {
    var tasks = tasks[i];
    promise = promise.then(tasks).then(pushValue);
  }
  return promise;
}

// 运行实例
main()
  .then(function(value) {
    console.log(value);
  })
  .catch(function(error) {
    console.error(error);
  });
