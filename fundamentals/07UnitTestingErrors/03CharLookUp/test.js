const { assert } = require('chai');

let { } = require('chai');
let lookupChar = require('./charLookUp');

describe('look up', () => {
    it('returns undefined if it is not a string for furst parameter', () => {
        assert.isUndefined(lookupChar(2, 2));
    });
    it('returns undefined if it is not a number for second parameter', () => {
        assert.isUndefined(lookupChar('string', 'a'));
    });
    it('returns incorrect index if it is out of bounds', () => {
        assert.equal(lookupChar('string', 10), 'Incorrect index');
    });
    it('returns incorrect index if it is out of bounds', () => {
        assert.equal(lookupChar('', 1), 'Incorrect index');
    });
    it('returns incorrect index if it is out of bounds', () => {
        assert.equal(lookupChar('string', -1), 'Incorrect index');
    });
    it('returns normal charater', () => {
        assert.equal(lookupChar('string', 1), 't');
    });
    it('returns normal charater', () => {
        assert.equal(lookupChar('string', 1.1), undefined);
    });
});