function solution() {
    let ingredients = createIngredientsObject(0, 0, 0, 0);

    let recipies = {
        apple: createIngredientsObject(0, 1, 0, 2),
        lemonade: createIngredientsObject(0, 10, 0, 20),
        burger: createIngredientsObject(0, 5, 7, 3),
        eggs: createIngredientsObject(5, 0, 1, 1),
        turkey: createIngredientsObject(10, 10, 10, 10)
    }
    let func = function found(string) {
        let array = string.split(' ');
        if (array[0] == 'report') {
            return `protein=${ingredients["protein"]} carbohydrate=${ingredients["carbohydrate"]} fat=${ingredients["fat"]} flavour=${ingredients["flavour"]}`;
        } else if (array[0] == 'restock') {
            if (ingredients[array[1]]) {
                return 'Error';
            }
            ingredients[array[1]] += Number(array[2]);
            return 'Success';
        } else if (array[0] == 'prepare') {
            let recipe = recipies[array[1]];
            let quantity = Number(array[2]);
            for (const key in recipe) {
                if (recipe[key] * quantity > ingredients[key]) {
                    return `Error: not enough ${key} in stock`;
                }
            }

            for (const key in recipe) {
                ingredients[key] -= recipe[key] * quantity;
            }
            return ("Success");
        }
    }
    function createIngredientsObject(qty, qty2, qty3, qty4) {
        return {
            protein: qty,
            carbohydrate: qty2,
            fat: qty3,
            flavour: qty4,

        }
    }
    return func;
}


let manager = solution();
console.log(manager("restock flavour 50"));
console.log(manager("restock fat 50"));
console.log(manager("prepare lemonade 4"));
console.log(manager("report"));