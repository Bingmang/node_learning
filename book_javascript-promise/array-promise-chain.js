function ArrayAsPromise(array) {
  this.array = array;
  this.promise = Promise.resolve();
}
ArrayAsPromise.prototype.then = function(onFulfilled, onRejected) {
  this.promise = this.promise.then(onFulfilled, onRejected);
  return this;
};
ArrayAsPromise.prototype["catch"] = function(onRejected) {
  this.promise = this.promise.catch(onRejected);
  return this;
};

// 把Array原生的方法给新的ArrayAsPromise
Object.getOwnPropertyNames(Array.prototype).forEach(function(methodName) {
  // 防止重写方法
  if (typeof ArrayAsPromise[methodName] !== "undefined") {
    return;
  }
  var arrayMethod = Array.prototype[methodName];
  // 只复制函数
  if (typeof arrayMethod !== "function") {
    return;
  }
  // 因为内嵌匿名函数，所以要用that保存上级函数的this，调用ArrayAsPromise的方法时，会自动调用then() 里面再执行原生方法
  ArrayAsPromise.prototype[methodName] = function() {
    var that = this;
    var args = arguments;
    this.promise = this.promise.then(function() {
      that.array = Array.prototype[methodName].apply(that.array, args);
      return that.array;
    });
    return this;
  };
});

module.exports = ArrayAsPromise;
module.exports.array = function newArrayAsPromise(array) {
  return new ArrayAsPromise(array);
};
