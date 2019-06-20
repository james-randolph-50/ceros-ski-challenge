import "babel-polyfill";

const skier = require('../Entities/Skier.js');

test('Game should not crash after pressing left key after collision', () => {
    expect(skier.setDirection().not.toBe(-1);
})