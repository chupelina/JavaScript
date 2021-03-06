const { assert } = require('chai');
let pizzUni = {
    makeAnOrder: function (obj) {

        if (!obj.orderedPizza) {
            throw new Error('You must order at least 1 Pizza to finish the order.');
        } else {
            let result = `You just ordered ${obj.orderedPizza}`
            if (obj.orderedDrink) {
                result += ` and ${obj.orderedDrink}.`
            }
            return result;
        }
    },

    getRemainingWork: function (statusArr) {

        const remainingArr = statusArr.filter(s => s.status != 'ready');

        if (remainingArr.length > 0) {

            let pizzaNames = remainingArr.map(p => p.pizzaName).join(', ')
            let pizzasLeft = `The following pizzas are still preparing: ${pizzaNames}.`

            return pizzasLeft;
        } else {
            return 'All orders are complete!'
        }

    },

    orderType: function (totalSum, typeOfOrder) {
        if (typeOfOrder === 'Carry Out') {
            totalSum -= totalSum * 0.1;

            return totalSum;
        } else if (typeOfOrder === 'Delivery') {

            return totalSum;
        }
    }
};
// console.log(pizzUni.makeAnOrder({orderedDrink: 'p'}))
// console.log(pizzUni.makeAnOrder({}));
// console.log(pizzUni);
describe("Tests …", function () {
    it("making order", function () {
        let curr = pizzUni;
        let inst = { orderedPizza: 'p', orderedDrink: 'd' };
        assert.equal('You just ordered p and d.', curr.makeAnOrder(inst));
        inst = { orderedDrink: 'd' };
        assert.throw(() => curr.makeAnOrder(inst),'You must order at least 1 Pizza to finish the order.');
        inst = { orderedPizza: 'p' };
        assert.equal(curr.makeAnOrder(inst), `You just ordered p`)
        inst = {};
        assert.throw(() => curr.makeAnOrder(inst),'You must order at least 1 Pizza to finish the order.');
    });

    it("getRemainingWork", function () {
        let piccaArray = [{ pizzaName: 'p', status: 'ready' }, { pizzaName: 'pi', status: 'preparing' }];
        assert.equal(pizzUni.getRemainingWork(piccaArray), `The following pizzas are still preparing: pi.`)
        piccaArray = [{ pizzaName: 'p', status: 'preparing' }, { pizzaName: 'pi', status: 'preparing' }];
        assert.equal(pizzUni.getRemainingWork(piccaArray), `The following pizzas are still preparing: p, pi.`)
        piccaArray = [];
        assert.equal(pizzUni.getRemainingWork(piccaArray), 'All orders are complete!');
        piccaArray = [{ pizzaName: 'p', status: 'ready' }, { pizzaName: 'pi', status: 'ready' }];
        assert.equal(pizzUni.getRemainingWork(piccaArray), 'All orders are complete!');

    });

    it("orderType", function () {
        let order = pizzUni.orderType(20, 'Delivery');
        assert.equal(order, 20);
        order = pizzUni.orderType(10, 'Carry Out');
        assert.equal(order, 9);
        order = pizzUni.orderType(10, 'Carry Out  ');
        assert.equal(order,);
    });
});