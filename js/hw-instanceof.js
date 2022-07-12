/**
 * 这是一个 instanceof 函数
 * 
 * 思路:
 * class 类: prototype   实例: __proto__  原型链
 * 
 * 实例.__proto__ == 类.prototype
 * 
 * myInstanceOf()
 * {example}     要验证的变量
 * {classFunc}   数据类型
 */

function myInstanceOf(example,classFunc){
    
    let ex_proto=Object.getPrototypeOf(example)
    let cl_prototype=classFunc.prototype

    console.log('classFunc',ex_proto,cl_prototype);//{}  {}
    
    while(true){

        if(ex_proto==null) return false;

        if(ex_proto==cl_prototype) return true;

        ex_proto=Object.getPrototypeOf(ex_proto);
        console.log('ex_proto',ex_proto);
    } 

}


let a=null,
b=undefined,
c=[1,2,3],
d={x:1,y:2},
e=1,
f=false,
g=function (){console.log(2);},
h='123232'
j=()=>{console.log(3);},
result=''


// result=myInstanceOf(d,Object)
result=myInstanceOf(e,String)
// result=myInstanceOf(c,Array)
// result=myInstanceOf(g,Function)
// result=myInstanceOf(h,String)

console.log(result);