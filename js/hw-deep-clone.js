/**
 * 这是一个深拷贝函数
 * 
 * 基本数据类型
 * 
 * 引用数据类型
 * 
 */


// 要拷贝的变量所对应的数据类型
const getType = obj => Object.prototype.toString.call(obj);

// true-对象,数组,函数,new 变量  false-null,...
const isObject = (target) => (typeof target === 'object' || typeof target === 'function') && target !== null;

//可遍历的对象集
const canTraverse = {
    '[object Map]': true,
    '[object Set]': true,
    '[object Array]': true,
    '[object Object]': true,
    '[object Arguments]': true,
};

const mapTag = '[object Map]';
const setTag = '[object Set]';

//不可遍历or不用遍历的对象标签
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

//拷贝正则
const handleRegExp = (target) => {
    const {
        source,
        flags
    } = target;
    return new target.constructor(source, flags);
}

//拷贝函数
const handleFunc = (func) => {
    // 箭头函数直接返回自身
    if (!func.prototype) return func;
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    // 分别匹配 函数参数 和 函数体
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (!body) return null;
    if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
    } else {
        return new Function(body[0]);
    }
}

const handleNotTraverse = (target, tag) => {
    const Ctor = target.constructor;

    console.log('Ctor',Ctor,new Ctor(target));

    switch (tag) {
        case boolTag:
            return new Object(Boolean.prototype.valueOf.call(target));
        case numberTag:
            return new Object(Number.prototype.valueOf.call(target));
        case stringTag:
            return new Object(String.prototype.valueOf.call(target));
        case symbolTag:
            return new Object(Symbol.prototype.valueOf.call(target));
        case errorTag:
        case dateTag:
            return new Ctor(target);
        case regexpTag:
            return handleRegExp(target);
        case funcTag:
            return handleFunc(target);
        default:
            return new Ctor(target);
    }
}

// map 与 WeakMap 区别：Weakmap则是完全不同的，它不会阻止关键对象的垃圾回收
// 第一条规则，weakmap只接受object作为key，第二条规则是它只保存对对象的弱引用。

const myDeepClone = (target, map = new WeakMap()) => {

    if (!isObject(target))
        return target;

    let type = getType(target);

    let cloneTarget;

    if (!canTraverse[type]) {
        // 处理不能遍历的对象
        return handleNotTraverse(target, type);
    } else {
        // 这波操作相当关键，可以保证对象的原型不丢失！
        let ctor = target.constructor;
        cloneTarget = new ctor();
    }

    if (map.get(target))
        return target;

    map.set(target, true);

    if (type === mapTag) {
        //处理Map
        target.forEach((item, key) => {
            cloneTarget.set(myDeepClone(key, map), myDeepClone(item, map));
        })
    }

    if (type === setTag) {
        //处理Set
        target.forEach(item => {
            cloneTarget.add(myDeepClone(item, map));
        })
    }

    // 处理可遍历的对象
    for (let prop in target) {
        if (target.hasOwnProperty(prop)) {
            cloneTarget[prop] = myDeepClone(target[prop], map);
        }
    }
    return cloneTarget;
}

let a = null,
    b = undefined,
    c = [1, 2, 3],
    d = {
        x: 1,
        y: 2
    },
    e = 1,
    f = false,
    g = function () {
        console.log(2);
    },
    h = '123232',
    j = () => {
        console.log(3);
    },
    reg = /^[0-9]$/,
    date = new Date(),
    sym = Symbol(),
    nMap=new Map(),
    nSet=new Set()
    result = ''

result = myDeepClone(d)

console.log(result);