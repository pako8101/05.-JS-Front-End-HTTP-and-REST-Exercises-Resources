console.log(1);


const promise = new Promise(function(resolve,reject){

    if (Math.random()<0.5) {
      return  reject('Canceled!')
    }

    setTimeout(()=>{
        resolve("Mura")
    },2000)

});
console.log(2);


promise
.then((result)=> {
    console.log(result);
    console.log(promise);
    
})
.catch((err)=>{
    console.log(err);
    
})
.finally(()=>{
    console.log(promise);
    
})
//const reject = Promise.reject('rej')
const all = 
// Promise.allSettled([reject,'boko','ceko',9,]);
Promise.all(['boko','ceko',9,]);
all.then((values)=>{
    console.log(values);
    
})
.catch(err =>console.log(err)
)

//callback Hell
// asyncFun((result1) => {
//     async2((res2)=>{
// async3((res3)=>{

// })
//     });
// })