const { expect } = require('chai');

let {} = require('chai');
let isOddOrEven = require('./isOddOrEven');

describe('is odd or even',()=>{
    it('with one letter', ()=>{
        expect(isOddOrEven('q')).to.equal('odd');
    });
    it('with two letter', ()=>{
        expect(isOddOrEven('qq')).to.equal('even');
    });
    it('with zero letter', ()=>{
        expect(isOddOrEven('')).to.equal('even');
    });
    it('with none letter', ()=>{
        expect(isOddOrEven(2)).to.equal(undefined);
    });
    it('with many(odd) letter', ()=>{
        expect(isOddOrEven('qsada')).to.equal('odd');
    });
    it('with many(even) letter', ()=>{
        expect(isOddOrEven('qsadas')).to.equal('even');
    });
});