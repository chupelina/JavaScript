class ChristmasDinner{
    constructor(budget){
       
       this.budget = budget;
       this.dishes=[];
       this.products=[];
       this.guests={};
    }
    get budget(){
        return this._budget;
    }
    set budget(value){
        if(value<0){
            throw Error('The budget cannot be a negative number');
          }
          this._budget = value;
    }

    shopping(product){
        let [type, price]=[...product];
        if(this.budget<price){
            throw Error('Not enough money to buy this product')
        }
        this.budget-=price;
        this.products.push(type);
        return `You have successfully bought ${type}!`
    }
    recipes(recipe){
          let productsList=recipe.productsList;
          let recipeName=recipe.recipeName
          let canBeDone = true;
          productsList.forEach(pr => {
              if(!this.products.includes(pr)){
               canBeDone = false;
              }
          });
          if(!canBeDone){
              throw Error ('We do not have this product');
          }
          this.dishes.push({recipeName,productsList });
          return `${recipeName} has been successfully cooked!`
    }
    inviteGuests(name, dish){
        let havADish = false;
       this.dishes.forEach(d=>{
           if(d.recipeName===dish){
               havADish=true;
           }
       })
       if(!havADish){
           throw Error('We do not have this dish');
       }
       let isPresent = false;
       for (const g in this.guests) {
           if(g== name){
               isPresent=true;
           }
       }
       if(isPresent){
           throw Error ('This guest has already been invited');
       }
       this.guests[name] = dish;
       return `You have successfully invited ${name}!`;
    }
    showAttendance(){
        let result = '';
        for (const g in this.guests) {
            let dish = this.guests[g];
            let currDishWithProducts =this.dishes.find(curr=>curr.recipeName===dish );
            result+=`${g} will eat ${dish}, which consists of ${currDishWithProducts.productsList.join(', ')}\n`;
        }
        return result.trim();
    }
}
let dinner = new ChristmasDinner(100);

dinner.shopping(['Salt', 1]);
console.log(dinner.budget);
dinner.shopping(['Beans', 3]);
console.log(dinner.budget);
dinner.shopping(['Cabbage', 4]);
console.log(dinner.budget);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey','Sugar']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
let a =dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});
console.log(a);
dinner.recipes({
    recipeName: 'Slivi',
    productsList: []
});
console.log(dinner.dishes);
dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());