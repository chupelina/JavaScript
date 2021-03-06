function increasing(arr){
let output = [];
let num = arr[0];
output.push(num);
for (let i = 0 ; i < arr.length ; i++){
    if(num<arr[i]){
     output.push(arr[i]);
     num = arr[i];
    }
}
return output;
}

console.log(increasing([1, 
    3, 
    8, 
    4, 
    10, 
    12, 
    3, 
    2, 
    24]));
console.log(increasing([1, 
    2, 
    3,
    4]
    ));
console.log(increasing([20, 
    3, 
    2, 
    15,
    6, 
    1]));