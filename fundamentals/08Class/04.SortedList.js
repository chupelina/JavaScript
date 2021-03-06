class List {
    constructor() {
        this.arr = [];
        this.size = this.arr.length;
    }
    add(a) {
        if (Number(a) || a == 0) {
            this.arr.push(a);
            this.arr.sort((a, b) => a - b);
            this.size++;
            return;
        }
        throw new TypeError;

    }
    remove(index) {
        if (index < this.arr.length || index >= 0 || Number(index)) {
            let current = this.arr[index];
            this.arr.splice(index, 1);
            this.size--;
            return current;
        }
        throw new TypeError;
    }
    get(index) {
        if (index < this.arr.length || index >= 0 || Number(index)) {
            return this.arr[index];
        }
        throw new TypeError;
    }
}
let myList = new List();
for (let i = 0; i < 10; i++) {
    myList.add(i);
}

myList.remove(9);
myList.remove(5);
myList.remove(0);
