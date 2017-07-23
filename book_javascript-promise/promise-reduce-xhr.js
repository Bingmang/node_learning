// 使用Array.prototype.reduce重写

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
  // 用[]来保存初始化值，this->null, results->[],
  var pushValue = recordValue.bind(null, []);
  // 返回promise对象的函数的数组
  var tasks = [request.comment, request.people];
  // reduce当提供initializeValue时，callback的第一个参数是initializeValue，然后从tasks中的第一个元素开始操作
  // 实现类似于for循环的Promise chain  
  return tasks.reduce(function(promise, task) {
    return promise.then(task).then(pushValue);
  }, Promise.resolve());
}

// 运行实例
main()
  .then(function(value) {
    console.log(value);
  })
  .catch(function(error) {
    console.error(error);
  });
