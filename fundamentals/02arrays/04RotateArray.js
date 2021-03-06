function roration(arr, rotNumber){
let rot = rotNumber%arr.length;
for (let i =0; i< rot ; i++){
    arr.unshift(arr.pop());
}
return arr.join(' ');
}

console.log(roration(['1', 
'2', 
'3', 
'4'], 
2));
console.log(roration(['Banana', 
'Orange', 
'Coconut', 
'Apple'], 
15));