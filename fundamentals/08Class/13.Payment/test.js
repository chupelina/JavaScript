let PaymentPackage= require('./13.PaymentPackage');
const { assert} = require('chai');

describe("PaymentPackage", ()=> {
    let instance = undefined;
    beforeEach () = > {
        instance = new PaymentPackage('name', 1)
    }
    it("setting currect name and value", ()=>{
       let curr = new PaymentPackage('aa', 10);
       assert.equal(curr.name, 'aa');
       assert.equal(curr.value, 10);
    });
    it('make invalid name', ()=>{
        let curr = new PaymentPackage('', 10);
        AssertionError(curr);
    });
    
});