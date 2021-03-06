function storage(input) {
    input.sort((a, b) => a.localeCompare(b));
    let output = {};
    for (let i = 0; i < input.length; i++) {
        let [name, price] = input[i].split(' : ');
        const firstName = name[0];

        if (!output[firstName]) {
            output[firstName] = [];
        }
        output[firstName].push({ name, price });

    }
    let result = [];
    for (const key in output) {
        result.push(key);
        let values = output[key].map(entry => `  ${entry.name}: ${entry.price}`);
        result.push(values.join('\n'));
    }
    return result.join('\n');
}

console.log(storage(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']));
console.log(storage(['Banana : 2',
    'Rubics Cube : 5',
    'Raspberry P : 4999',
    'Rolex : 100000',
    'Rollon : 10',
    'Rali Car : 2000000',
    'Pesho : 0.000001',
    'Barrel : 10']));