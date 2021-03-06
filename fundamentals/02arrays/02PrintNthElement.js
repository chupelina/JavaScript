function print(arr, numb){
    let output = [];
for(let i=0; i<arr.length ; i+=numb){
output.push(arr[i]);
}
return output;
}
console.log(print(['5', 
'20', 
'31', 
'4', 
'20'], 
2));
console.log(print(['dsa',
'asd', 
'test', 
'tset'], 
2));
console.log(print(['1', 
'2',
'3', 
'4', 
'5'], 
6));