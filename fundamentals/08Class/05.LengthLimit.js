class Stringer {
    constructor(string, number) {
        this.innerString = string;
        this.innerLength = number;
    }
    decrease(curr) {
        this.innerLength= this.innerLength - curr < 0 ? 0 : this.innerLength-curr;
              return this.innerLength;
    }
    increase(curr) {
        if (curr < 0) {
            curr = 0;
        }
        this.innerLength= this.innerLength+curr;
        return this.innerLength;
    }
    toString() {
        if (this.innerString.length <= this.innerLength) {
            return this.innerString;
        } 
        return this.innerString.slice(0, this.innerLength) + '.'.repeat(3);
    }
}


let s = new Stringer("Viktor", 6);
s.decrease(9);
console.log(s.toString());
console.log(s.innerLength);
s.increase(3);
console.log(s.toString());
console.log(s.innerLength);
s.decrease(3);
console.log(s.toString());
console.log(s.innerLength);

let v = new Stringer("Viktor", 6);
v.increase(3);
console.log(v.innerLength);
console.log(s.toString());
// let test = new Stringer("Test", 5);
// console.log(test.toString()); // Test
// console.log(test.innerLength);
// test.decrease(3);
// console.log(test.toString()); // Te...
// console.log(test.innerLength);
// test.decrease(5);
// console.log(test.toString()); // ...
// console.log(test.innerLength);
// test.increase(4); 
// console.log(test.toString()); // Test
// console.log(test.innerLength);