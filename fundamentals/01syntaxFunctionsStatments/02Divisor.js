function divisor(first, second) {
    while(first!=second){
        if(first>second){
            first = first-second;
        }else{
            second = second - first;
        }
    }
    return first;
}

console.log(divisor(15, 5));
console.log(divisor(2154, 458));