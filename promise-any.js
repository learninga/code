/**
 * @param promiseArray
 * @returns a promise
 * @important
 * 1. rejected 时返回 AggregateError 
 * 2. 出现一个 resolve 时，立刻 resolve
 */
const myPromiseAny = promiseArray => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promiseArray)) {
            reject(new Error('not an array'));
        }
        if(promiseArray.length === 0) {
            reject(new AggregateError)
        }
        const rejectRes = [];
        promiseArray.forEach((promise, index) => {
            Promise.resolve(promise).then(val => {
                resolve(val);
            }).catch(err => {
                rejectRes[index] = {
                    status: 'rejected',
                    value: err
                }
            });
        })
        reject(new AggregateError(rejectRes))
    })
}