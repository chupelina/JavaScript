function print(type, grams, money){
    const kilograms = grams/1000;
    const price = money*kilograms;
    console.log(`I need $${price.toFixed(2)} to buy ${kilograms.toFixed(2)} kilograms ${type}.`);
}

print('orange', 2500, 1.80);