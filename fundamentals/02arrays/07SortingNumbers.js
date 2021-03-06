function sorting(numbers){
let output =[];
numbers.sort((a,b)=> a-b);
let n = 0;
for ( let i = 0; i <Math.floor(numbers.length/2) ; i++){
    output[n]=numbers[i];
    n++;
    output[n]=numbers[numbers.length-i-1];
    n++;
}
if(numbers.length%2!=0){
    output[n] = numbers[Math.ceil(numbers.length/2)-1];
}
return output;
}

console.log(sorting([1, 65, 3, 52, 48, 63, 2, 31, -3, 18, 56]));