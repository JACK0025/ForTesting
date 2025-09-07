
const { expect } = require('chai');
const { addition, subtraction } = require('../math');

describe('add()', () => {
  it('should return 5 when adding 2 and 3', () => {
    expect(addition(2, 3)).to.equal(5);
  });

  it('should return -1 when adding -2 and 1', () => {
    expect(addition(-2, 1)).to.equal(-1);
  });

  it('should return 0 when adding 0 and 0', () => {
    expect(addition(0, 0)).to.equal(0);
  });
});

describe('subtract()', () => {
  it('should return -1 when subtracting 2 and 3', () => {
    expect(subtraction(2, 3)).to.equal(-1);
  });

  it('should return 5 when subtracting 10 and 5', () => {
    expect(subtraction(10, 5)).to.equal(5);
  });

  it('should return 0 when subtracting 0 and 0', () => {
    expect(subtraction(0, 0)).to.equal(0);
  });
});