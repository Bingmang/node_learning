var assert = require('assert')

function shouldRejected(promise) {
    return {
        // 这个catch包装了 .then(onFulFilled, onRejected) 方法
        // 在传入的函数fn中处理正常该抛出的异常函数即可
        // 如果这个promise resolve了，就会抛出异常，测试也会失败
        'catch': function (fn) {
            return promise.then(function () {
                throw new Error('Expected promise to be rejected but it was fulfilled')
            }, function (reason) {
                fn.call(promise, reason)
            })
        }
    }
}

it('should be rejected', function () {
    var promise = Promise.reject(new Error("human error"))
    return shouldRejected(promise).catch(function (error) {
        assert(error.message === "human error")
    })
})