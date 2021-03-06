
(function slove() {
    Array.prototype.last = function () {
        return this[this.length - 1];
    }
    Array.prototype.skip = function (n) {
        let retunred = [];
        for (let i = n; i < this.length; i++) {
            retunred.push(this[i]);
        }
        return retunred;
    }
    Array.prototype.take = function (n) {
        let retunred = [];
        for (let i = 0; i < n; i++) {
            retunred.push(this[i]);
        }
        return retunred;
    }
    Array.prototype.sum = function () {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum+=this[i];
            
        }
        return sum;
    }
    Array.prototype.average = function () {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum+=this[i];
            
        }
        return sum/ this.length;
    }
}());



var testArray = [1, 2, 3];
console.log(testArray.last())
console.log(testArray.skip(1))
console.log(testArray.take(1))
console.log(testArray.sum())
console.log(testArray.average())