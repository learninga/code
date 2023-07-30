/**
 * myPromiseRace
 * @param {*} promiseArray 
 * @returns a promise whose status and value decided by the first promise having status
 */
const myPromiseRace = promiseArray => {
      if (!Array.isArray(promiseArray)) {
        reject(new Error('not an array'));
      }
    return new Promise((resolve, reject) => {
        promiseArray.forEach(promise => {
            Promise.resolve(promise).then(val => resolve(val)).catch(err => reject(err))
        })
    })
};
// 测试一下
const p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 500, 1)
  })
  
  const p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 2)
  })
  
  myPromiseRace([p1, p2]).then((value) => {
    console.log(value) // 2
  })
  
  myPromiseRace([p1, p2, 3]).then((value) => {
    console.log(value) // 3
  })