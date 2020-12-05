module.exports = function (f) {
    return (...args) => new Promise((res, rej) => f(...args, (err, ...data) => {
        if (err) return rej(err)
        return res(data)
    }))
}