function cooking(number, first, second, third, fourd, fift) {
    let curr = [first, second, third, fourd, fift];

    for (let i = 0; i < curr.length; i++) {
        let token = curr[i];
        if (token == 'chop') {
            number = number / 2;
        } else if (token == 'dice') {
            number = Math.sqrt(number);
        } else if (token == 'spice') {
            number = number + 1;
        } else if (token == 'bake') {
            number = number * 3;
        } else if (token == 'fillet') {
            number = 0.8*number;
        }
        console.log(number);
    }
}

cooking('32', 'chop', 'chop', 'chop', 'chop', 'chop');
cooking('9', 'dice', 'spice', 'chop', 'bake', 'fillet');
