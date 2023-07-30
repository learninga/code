/**
 * Promise.all() 
 * @param promiseArray 
 * @returnType Promise
 * @important 
 * 1. promiseArray 不一定全部为 promise
 * 2. 返回的 Promise 回调函数会接收值， fullfilled 状态下接收所有 promise value，rejected 状态接收导致 reject 的 value
 */
const myPromiseAll = (promiseArray) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promiseArray)){
            return reject(new Error('not an array'));
        }
        const res = [];
        let count = 0;

        promiseArray.forEach((promise, index) => {
            Promise.resolve(promise).then(val => {
                count ++;
                res[index] = val;
                if (count === promiseArray.length) {
                    resolve(res);
                }
            }).catch(e => reject(e))
        })
    })
}

// test cases
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000)
})

const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')


const resTest = myPromiseAll([p1, p2, p3, p4, p5]);
const res = Promise.all([p1, p2, p3, p4, p5]);

console.log('resTest', resTest)
console.log('res', res);