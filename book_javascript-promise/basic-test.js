var assert = require('assert')

describe('Basic Test', function () {
    it('should use `done` for test', function (done) {
        setTimeout(function () {
            assert(true)
            done()
        }, 0)
    })
})

context('When promise object', function () {
    it('should use `done` for test?', function () {
        var promise = Promise.resolve(1)
        return promise.then(function (value) {
            assert(value === 1)
        })
    })
    // 会将AssertionError传递给.catch
    it('should bad pattern', function () {
        return mayBeRejected().then(function () {
            assert(true)
        }).catch(function (err) {
            assert(err.message === "woo")
        })
    })
    // 这样的话在promise变为FulFilled的时候就不会再把AssertionError传递给catch了
    // 虽然推荐then catch的写法，但是测试的时候必须要明确指定Promise在各种状态下进行何种的处理
    it('catch -> then', function () {
        return mayBeRejected().then(function () {
            assert(true)
        }, function (err) {
            assert(err.message === "woo")
        })
    })
})

function mayBeRejected() {
    return Promise.resolve()
}
