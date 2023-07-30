/**
 * myPromiseAllSettled
 * @param {*} promiseArray 
 * @returns a fullfilled promise containing each promise's status and value
 * @important
 * 1. 返回的 Promise 状态一定为 fullfilled 状态
 * 2. 返回的 Promise 包含 promiseArray 中所有 promise 执行状态和取值
 * 3. param 类型校验
 */
Promise.myPromiseAllSettled = (promiseArray) => {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promiseArray)) {
            reject(new Error('not an array'));
        }
        const res = [];
        promiseArray.forEach((promise, index) => {
            Promise.resolve(promise).then(res => {
                res[index] = {
                    status: 'fullfilled',
                    value: res
                };
            }).catch(err => {
                res[index] = {
                    status: 'rejected',
                    value: err
                }
            })
        })
        resolve(res);
    })
};


// 测试案例
const p1 = Promise.resolve(1)
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000)
})
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000)
})

const p4 = Promise.reject('err4')
const p5 = Promise.reject('err5')

// 1. 所有的Promise都成功了
const p11 = Promise.myPromiseAllSettled([ p1, p2, p3 ])
 .then((res) => console.log(JSON.stringify(res, null,  2)))