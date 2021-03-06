const { assert } = require('chai');
class PaymentPackage {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.VAT = 20;      // Default value    
    this.active = true; // Default value
  }

  get name() {
    return this._name;
  }

  set name(newValue) {
    if (typeof newValue !== 'string') {
      throw new Error('Name must be a non-empty string');
    }
    if (newValue.length === 0) {
      throw new Error('Name must be a non-empty string');
    }
    this._name = newValue;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (typeof newValue !== 'number') {
      throw new Error('Value must be a non-negative number');
    }
    if (newValue < 0) {
      throw new Error('Value must be a non-negative number');
    }
    this._value = newValue;
  }

  get VAT() {
    return this._VAT;
  }

  set VAT(newValue) {
    if (typeof newValue !== 'number') {
      throw new Error('VAT must be a non-negative number');
    }
    if (newValue < 0) {
      throw new Error('VAT must be a non-negative number');
    }
    this._VAT = newValue;
  }

  get active() {
    return this._active;
  }

  set active(newValue) {
    if (typeof newValue !== 'boolean') {
      throw new Error('Active status must be a boolean');
    }
    this._active = newValue;
  }

  toString() {
    const output = [
      `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
      `- Value (excl. VAT): ${this.value}`,
      `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
    ];
    return output.join('\n');
  }
}

describe("PaymentPackage", () => {
  it("constructor", () => {
    let curr = new PaymentPackage('aa', 10);
    assert.equal(curr._name, 'aa');
    assert.equal(curr._value, 10);
    assert.equal(curr._VAT, 20);
    assert.equal(curr._active, true);
  });
  it('name', () => {
    let curr = new PaymentPackage('aa', 10);
    assert.equal(curr.name, "aa");
    curr.name = 'bb';
    assert.equal(curr.name, 'bb');
    assert.throw(() => { curr.name = '' }, 'Name must be a non-empty string');
    assert.throw(() => { curr.name = 1 }, 'Name must be a non-empty string');

  });
  it('VAT', () => {
    let curr = new PaymentPackage('aa', 10);
    assert.equal(curr.VAT, 20);
    curr.VAT = 10;
    assert.equal(curr.VAT, 10);
    assert.throw(() => { curr.VAT = "a" }, 'VAT must be a non-negative number');
    assert.throw(() => { curr.VAT = true }, 'VAT must be a non-negative number');
    assert.throw(() => { curr.VAT = "idiots" }, 'VAT must be a non-negative number');
    assert.throw(() => { curr.VAT = -5 }, 'VAT must be a non-negative number');
  });
  it('active', () => {
    let curr = new PaymentPackage('aa', 10);
    assert.equal(curr.active, true);
    curr.active = false;
    assert.equal(curr.active, false);
    assert.throw(() => { curr.active = "a" }, 'Active status must be a boolean');
    assert.throw(() => { curr.active = -5 }, 'Active status must be a boolean');
  });
  it('value', () => {
    let curr = new PaymentPackage('aa', 10);
    assert.equal(curr.value, 10);
    curr.value = 5;
    assert.equal(curr.value, 5);
    curr.value = 0;
    assert.equal(curr.value, 0);
    assert.throw(() => { curr.value = "a" }, 'Value must be a non-negative number');
    assert.throw(() => { curr.value = -5 }, 'Value must be a non-negative number');

  });
  it('toString', () => {
    let curr = new PaymentPackage('HR Services', 1500);
    function string(name, value, active = true, VAT = 20) {
      return [
        `Package: ${name}` + (active === false ? ' (inactive)' : ''),
        `- Value (excl. VAT): ${value}`,
        `- Value (VAT ${VAT}%): ${value * (1 + VAT / 100)}`
      ].join('\n');
    };
     assert.equal(curr.toString(), string('HR Services', 1500));
     curr.active=false;
     assert.equal(curr.toString(), string('HR Services', 1500, false));
     curr.VAT = 10;
     assert.equal(curr.toString(), string('HR Services', 1500, false,10));
     curr.name = "a";
     assert.equal(curr.toString(), string('a', 1500, false,10));
     curr.value=1;
     assert.equal(curr.toString(), string('a', 1, false,10));

  });
});