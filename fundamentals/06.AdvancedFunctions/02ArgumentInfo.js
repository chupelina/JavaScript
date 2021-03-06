function result(strings) {
    let result = [];
    let output = {};
    [...arguments].forEach(argument=>{
        let type = typeof argument;
        if(!output[type]){
            output[type]= 0;
        }
        output[type]+=1;
        result.push({type, value: argument});})
   
    result.map(current=>
        console.log(`${current.type}: ${current.value}`));
     let sort = Object.entries(output).sort((a,b)=>b[1]-a[1]);
        sort.forEach(el=> console.log(`${el[0]} = ${el[1]}`))
}

result('cat', 42, function () { console.log('Hello world!'); });