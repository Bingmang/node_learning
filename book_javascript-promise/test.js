var promise = new Promise(function (resolve, reject) {
    try {
        throw new Error('Ouch')
    } catch (err) {
        console.log(err)
    }
    resolve()
})

promise
    .then(() => console.log('promise中抛出异常不会reject'))
    .catch(() => console.log('Promise中抛出异常会直接导致reject'))
    

// output: promise中抛出异常不会reject