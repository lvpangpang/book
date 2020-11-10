// 深拷贝-复杂类型颗粒化解决
function deepClone(target) {
  if(target instanceof Object) {
    let temp;
    if(target instanceof Array) {
      temp = [];
    } else if(target instanceof Function) {
      temp = function() {
        return target.call(this, ...arguments);
      }
    } else if(target instanceof RegExp) {
      temp = new RegExp(target.source, target.flags);
    } else if(target instanceof Date) {
      temp = new Date(target);
    } else {
      temp = {};
    }
    for(let key in target) {
      if(target.hasOwnProperty(key)) {
        temp[key] = deepClone(target[key]);
      }
    }
    return temp;
  } else {
    return target;
  }
}

let obj = {
  name: '吕肥肥',
  arr: [1, 2, 3],
  say: (name) => {
    console.log(name)
  }
};

let obj1 = deepClone(obj);
obj1.arr = [5];
console.log(obj);
console.log(obj1);

let obj2 = obj;
obj2.arr = [2];
console.log(obj)