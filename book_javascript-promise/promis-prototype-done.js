if (typeof Promise.prototype.done === "undefined") {
    Promise.prototype.done = function (onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected).catch(function (error) {
            // 使用setTimeout抛出全局异常（因为异步callback中抛出的异常不会被捕获）
            setTimeout(function () {
                throw error
            }, 0)
        })
    }
}