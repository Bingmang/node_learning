var assert = require('assert')

function shouldFulfilled(promise) {
    return {
        // 这样就不用管promise中抛出的异常不会被测试框架捕捉到了
        'then': function (fn) {
            return promise.then(function (value) {
                fn.call(promise, value)
            }, function (reason) {
                throw reason
            })
        }
    }
}

it('should be fulfilled', function () {
    var promise = Promise.resolve('value')
    return shouldFulfilled(promise).then(function (value) {
        assert(value === 'value')
    })
})