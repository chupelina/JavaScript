function products(input) {
    let log = {
    };
    for (let i = 0; i < input.length; i++) {
        let [town, product, price] = input[i].split(' | ');
        if (!log[product]) {
            log[product] = {town, price: Number(price)};
        }else {
          log[product]= log[product].price<=Number(price)
          ? log[product] : {town, price: Number(price)};
        }
    }
    let output = [];
   for(const current in log){
     output.push(`${current} -> ${log[current].price} (${log[current].town})`);
   }
   return output.join('\n');
}

console.log(products(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10']));