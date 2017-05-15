"use strict";

QUnit.module('Chapter 2, object freeze');

const Person = require('../model/Person.js').Person;
const Student = require('../model/Student.js').Student;
const Address = require('../model/Address.js').Address;

QUnit.test('It checks the method freeze from Object works correctly', function() {
    const person = Object.freeze(new Person('Haskell', 'Curry', '444-44-4444'));

    assert.throws(() => {
        person.firstname = 'Bob';
    }, TypeError);
});

QUnit.test('It checks the method freeze from Object don\'t work on nested attributes', function() {
    const address = new Address('US');
    const student = Object.freeze(new Student('444-44-4444', 'Joe', 'Smith', 'Harvard', 1960, address));

    assert.ok(() => {
        student.address.country = 'Perú';
    });
});
