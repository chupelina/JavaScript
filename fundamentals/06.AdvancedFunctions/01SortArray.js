function solve(arr, type) {
    if (type == 'asc') {
       return arr.sort((a, b) => a - b);
    } else if (type == 'desc') {
       return arr.sort((a, b) => b - a);
    }


}

console.log(solve(
    [14, 7, 17, 6, 8], 'asc'
));
console.log(solve(
    [14, 7, 17, 6, 8], 'desc'
));