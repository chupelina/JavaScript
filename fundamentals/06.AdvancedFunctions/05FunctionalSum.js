function add(num) {
    let sum = num;

    function calc(num2) {
        sum += num2;
        return calc;
    };

   calc.toString= function() { return sum };
    return calc;
}


console.log(add(1)(2)(4)(6)(8)(9));