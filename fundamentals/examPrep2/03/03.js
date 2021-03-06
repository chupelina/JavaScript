const { assert } = require('chai');

let dealership = {

    newCarCost: function (oldCarModel, newCarPrice) {



        let discountForOldCar = {

            'Audi A4 B8': 15000,

            'Audi A6 4K': 20000,

            'Audi A8 D5': 25000,

            'Audi TT 8J': 14000,

        }



        if (discountForOldCar.hasOwnProperty(oldCarModel)) {

            let discount = discountForOldCar[oldCarModel];

            let finalPrice = newCarPrice - discount;

            return finalPrice;

        } else {

            return newCarPrice;

        }

    },



    carEquipment: function (extrasArr, indexArr) {

        let selectedExtras = [];

        indexArr.forEach(i => {

            selectedExtras.push(extrasArr[i])

        });



        return selectedExtras;

    },



    euroCategory: function (category) {

        if (category >= 4) {

            let price = this.newCarCost('Audi A4 B8', 30000);

            let total = price - (price * 0.05)

            return `We have added 5% discount to the final price: ${total}.`;

        } else {

            return 'Your euro category is low, so there is no discount from the final price!';

        }

    }

}

describe("dealership", function () {

    it("newCarCost", function () {
        let current = dealership.newCarCost('Ford', 15000);
        assert.equal(current, 15000);
        current = dealership.newCarCost('Audi A4 B8', 15000);
        assert.equal(current, 0);
        current = dealership.newCarCost('Audi A4 B8', 10000);
        assert.equal(current, -5000);
        current = dealership.newCarCost('Audi A4 B8', 20000);
        assert.equal(current, 5000);
    });
    it("carEquipment", function () {
       let current = dealership.carEquipment(['a'], [0]);
       let exp = [ 'a' ];
       assert.deepEqual(current,   exp);
      current = dealership.carEquipment(['a', 'b'], [0, 1]);
        exp = [ 'a', 'b' ];
       assert.deepEqual(current,   exp);
       current = dealership.carEquipment([], []);
       exp = [];
      assert.deepEqual(current,   exp);
    });
    it("euroCategory", function () {
        let current = dealership.euroCategory(4);
        assert.equal(current, 'We have added 5% discount to the final price: 14250.')
        current = dealership.euroCategory(5);
        assert.equal(current, 'We have added 5% discount to the final price: 14250.')
        current = dealership.euroCategory(0);
        assert.equal(current, 'Your euro category is low, so there is no discount from the final price!')
    });

});