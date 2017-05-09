/**
  En lugar de crerar un montón de tipos derivados, podemos extender
  el comportamiento de una función pasando una función como parámetro

const Student = require('../model/Student.js').Student;
const Address = require('../model/Address.js').Address;
var curry = new Student('Haskell', 'Curry', '111-11-1111', 'Penn State', null, new Address('US'));
var turing = new Student('Alan', 'Turing', '222-22-2222', 'Princeton', null, new Address('England'));
var church = new Student('Alonzo', 'Church', '333-33-3333', 'Princeton', null, new Address('England'));
var kleene = new Student('Stephen', 'Kleene', '444-44-4444', 'Princeton', null, new Address('US'));
**/

function selector(country, school) {
    return function(student) {
        return student.address.country === country &&
            student.school === school;
    };
}
var findStudentsBy = function(friends, selector) {
    return friends.filter(selector);
};

module.exports = {
    methods: {
        findStudentsBy,
        selector
    }
}
