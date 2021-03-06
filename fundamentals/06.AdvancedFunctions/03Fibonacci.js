function getFibonator() {

    let first = 0;
    let second = 1;
    let temp;
    return function solve() {
        temp = second ;
        second = first + second;
        first = temp;
        return first;
    }
}

 let fib = getFibonator();
 console.log(fib()); // 1
 console.log(fib()); // 1
 console.log(fib()); // 2
 console.log(fib()); // 3
 console.log(fib()); // 5
 console.log(fib()); // 8
 console.log(fib()); // 13