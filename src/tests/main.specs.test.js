const { foo } = require('./somefile.js');
test('This should return Andres 21', () => {
    var data = foo('Andres', 21);
    expect(data).toBe('name: Andres, age: 21');
});