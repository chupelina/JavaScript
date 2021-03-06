const { assert } = require('chai');
let mathEnforcer = require('./mathEnforcer');

describe('mathEnforrcer', function () {
    describe('addFive', function () {
       it('should return currect result with non-number parameter', function(){
          assert.isUndefined(mathEnforcer.addFive('a'));
       });
       it('should return currect result with number parameter', function(){
        assert.equal(mathEnforcer.addFive(1), 6);
     });
     it('should return currect result with number parameter', function(){
        assert.equal(mathEnforcer.addFive(-10), -5);
     });
     it('should return currect result with number parameter', function(){
        assert.equal(mathEnforcer.addFive(1.1), 6.1);
     });
    });
    describe('substractTen', function () {
        it('should return currect result with non-number parameter', function(){
            assert.isUndefined(mathEnforcer.subtractTen('a'));
        });
        it('should return currect result with number parameter', function(){
            assert.equal(mathEnforcer.subtractTen(10), 0);
        });
        it('should return currect result with number parameter', function(){
            assert.equal(mathEnforcer.subtractTen(0), -10);
        });
        it('should return currect result with number parameter', function(){
            assert.equal(mathEnforcer.subtractTen(-0.1), -10.1);
        });
    }); 
    describe('sum', function () {
        it('should return currect result with non-number for first parameter', function(){
            assert.isUndefined(mathEnforcer.sum(1, 'a'));
        });
        it('should return currect result with non-number for second parameter', function(){
            assert.isUndefined(mathEnforcer.sum( 'a',1));
        });
        it('should return currect result with numbers  parameters', function(){
            assert.equal(mathEnforcer.sum( 1,1),2);
        });
        it('should return currect result with numbers  parameters', function(){
            assert.equal(mathEnforcer.sum( -1,-1),-2);
        });
        it('should return currect result with numbers  parameters', function(){
            assert.equal(mathEnforcer.sum( 1.1, 1.1),2.2);
        });
    });


});