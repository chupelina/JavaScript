const { assert } = require('chai');
const numberOperations = {
    powNumber: function (num) {
        return num * num;
    },
    numberChecker: function (input) {
        input = Number(input);

        if (isNaN(input)) {
            throw new Error('The input is not a number!');
        }

        if (input < 100) {
            return 'The number is lower than 100!';
        } else {
            return 'The number is greater or equal to 100!';
        }
    },
    sumArrays: function (array1, array2) {

        const longerArr = array1.length > array2.length ? array1 : array2;
        const rounds = array1.length < array2.length ? array1.length : array2.length;

        const resultArr = [];

        for (let i = 0; i < rounds; i++) {
            resultArr.push(array1[i] + array2[i]);
        }

        resultArr.push(...longerArr.slice(rounds));

        return resultArr
    }
};


describe("Tests …", function () {
    it("powNumber", function () {
        let current = numberOperations.powNumber(2);
        assert.equal(current, 4);
        current = numberOperations.powNumber(-2);
        assert.equal(current, 4);
        current = numberOperations.powNumber(0);
        assert.equal(current, 0);
        current = numberOperations.powNumber(0.1);
        assert.equal(current.toFixed(2), 0.01);
    });

    it("numberChecker", function () {
        assert.throw(() => numberOperations.numberChecker('a'), 'The input is not a number!');
        assert.throw(() => numberOperations.numberChecker(undefined), 'The input is not a number!');
        assert.throw(() => numberOperations.numberChecker(NaN), 'The input is not a number!');
        let current = numberOperations.numberChecker(9);
        assert.equal(current, 'The number is lower than 100!');
        current = numberOperations.numberChecker(100);
        assert.equal(current, 'The number is greater or equal to 100!');
        current = numberOperations.numberChecker(101);
        assert.equal(current, 'The number is greater or equal to 100!');
    });

    it("orderType", function () {
        let current = numberOperations.sumArrays([1, 2], [1, 2])
        assert.deepEqual(current, [2, 4]);
        current = numberOperations.sumArrays([1], [1, 2])
        assert.deepEqual(current, [2, 2]);
        current = numberOperations.sumArrays([1,2 ], [1])
        assert.deepEqual(current, [2, 2]);
        current = numberOperations.sumArrays([ ], [])
        assert.deepEqual(current, []);
    });
});