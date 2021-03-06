function solve(array){
 let map = new Map();
 let bottels = new Set();
 array.map((a)=>{
    let current = a.split(' => ');
    if(!map.has(current[0])){
        map.set(current[0], 0);
    }
    let value = map.get(current[0])+Number(current[1]);
    map.set(current[0], value);
    if(value>=1000){
        bottels.add(current[0]);
    }
 })
let output= [];
  for (const bottle of bottels) {
      let value = map.get(bottle);
      let b=value/1000;
      output.push(bottle, Math.floor(b));
  }
 let result='';
for (let i = 0; i < output.length; i+=2) {
    result+=`${output[i]} => ${output[i+1]}\n`
    
}
 return result;
}
console.log(solve(['Orange => 2000',
'Peach => 1432',
'Banana => 450',
'Peach => 600',
'Strawberry => 549']));
console.log(solve(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']));