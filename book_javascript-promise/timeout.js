function delayPromise(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms)
    })
}

function timeoutPromise(promise, ms) {
    var timeout = delayPromise(ms).then(function () {
        return Promise.reject(new Error('Operation timed out after'+ms+'ms'))
    })
    return Promise.race([promise, timeout])
}