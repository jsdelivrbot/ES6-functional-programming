QUnit.module('Chapter 2');

const R = require('ramda');
const Person = require('../model/Person.js').Person;
const Address = require('../model/Address.js').Address;
const ValueObjects = require('../model/value_objects.js');
const zipCode = ValueObjects.zipCode;

QUnit.test('It checks on creation of new objects from lenses', function() {
    var person = new Person('Alonzo', 'Church', '444-44-4444');
    var lastnameLens = R.lensProp('lastName');
    var newPerson = R.set(lastnameLens, 'Mourning', person);

    assert.notEqual(newPerson.lastname, person.lastname);
});


QUnit.test('It checks on reference passing for javascript', function() {
    var person = new Person('Alonzo', 'Church', '444-44-4444');
    var newPerson = person;
    newPerson.lastname = 'Heidi';
    person.lastname = 'Junior';
    assert.equal(newPerson.lastname, person.lastname);
});
