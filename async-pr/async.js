console.log(1);

setTimeout(()=>{
    console.log(2);
    
},1);

console.log(3);


function some (callBack){
setTimeout(() => {callBack(2345,25)},5000 )
   
}
function cals(a,b){
    console.log(a * b);
    
}
some(cals);
