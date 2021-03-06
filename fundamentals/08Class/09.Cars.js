function solve(array) {
  class Brand {
    constructor(brand) {
      this.brand = brand;
      this.models = [];
    }
    setModel(model, count) {
      this.models.push({ model, count });
    }
    containsModel(currentModel) {
      let cur = this.models.filter(m => m.model == currentModel)
      return cur.length == 1 ? true : false;
    }
    increaseCount(modelC, countC) {
      let curr = this.models.filter(a => a.model == modelC)[0];
      curr.count += Number(countC);
    }
    toString() {
      let result = '';
      result += `${this.brand}\n`
      this.models.map(m =>
        result += `###${m.model} -> ${m.count}\n`)
      return result;
    }
  }
  let brands = new Map();
  array.map(c => {
    let tokens = c.split(' | ');
    if (!brands.has(tokens[0])) {
      brands.set(tokens[0], new Brand(tokens[0]));
    }
    if (brands.get(tokens[0]).containsModel(tokens[1])) {
      brands.get(tokens[0]).increaseCount(tokens[1], Number(tokens[2]));
    } else {
      brands.get(tokens[0]).setModel(tokens[1], Number(tokens[2]));
    }
  });
let res = '';
  brands.forEach(v=>res+=v.toString());
  return res;
}

console.log(solve(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10']));