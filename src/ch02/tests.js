"use strict";

QUnit.module('Chapter 2');

var curry = new Student('Haskell', 'Curry', '111-11-1111', 'Penn State', null, new Address('US'));
var turing = new Student('Alan', 'Turing', '222-22-2222', 'Princeton', null, new Address('England'));
var church = new Student('Alonzo', 'Church', '333-33-3333', 'Princeton', null, new Address('England'));
var kleene = new Student('Stephen', 'Kleene', '444-44-4444', 'Princeton', null, new Address('US'));

const R = require('ramda');

const ValueObjects = require('../model/value_objects.js');
const zipCode = ValueObjects.zipCode;
const coordinate = ValueObjects.coordinate;
const Student = require('../model/Student.js').Student;
const Address = require('../model/Address.js').Address;
const methodsFromFP = require('./solution-fp').methods;

QUnit.test('Using the methods from programming functional solution', function() {
    const resolve = {
        _ssn: 'Stephen'
    };
    const founds = methodsFromFP.findStudentsBy([curry, turing, church, kleene],
        methodsFromFP.selector('US', 'Princeton'));

    assert.equal(founds[0]._ssn, resolve._ssn);
});

QUnit.test('It checks the results from FP and from POO', function() {
    var aux = new Student('x', 'x', 'x', 'Princeton', null, new Address('US'));
    const friends = [curry, turing, church, kleene];
    const foundsFromFP = methodsFromFP.findStudentsBy(friends,
        methodsFromFP.selector('US', 'Princeton'));
    const foundFromPOO = aux.studentsInSameCountryAndSchool(friends);

    assert.equal(foundsFromFP[0]._ssn, foundFromPOO[0]._ssn);
});

QUnit.test("Playing with immutable value objects", function() {

    let princetonZip = zipCode('08544', '3345');
    assert.equal(princetonZip.toString(), '08544-3345');

    let greenwich = coordinate(51.4778, 0.0015);
    assert.equal(greenwich.toString(), '(51.4778,0.0015)');

    let newCoord = greenwich.translate(10, 10).toString();
    assert.equal(newCoord.toString(), '(61.4778,10.0015)');
});

QUnit.test("Deep freeze object", function() {
    const deepFreeze = require('./helper').deepFreeze;
    let address = new Address('US');
    let student = new Student('444-44-4444', 'Joe', 'Smith',
        'Harvard', 1960, address);
    let frozenStudent = deepFreeze(student);

    assert.throws(() => {
        frozenStudent.firstname = 'Emmet'; // Expect: Cannot assign to read only property '_firstname' of object '#<Student>'
    }, TypeError);

    assert.throws(() => {
        frozenStudent.address.country = 'Canada'; // Expect: Cannot assign to read only property '_country' of object '#<Address>'
    }, TypeError);
});


QUnit.test("Playing with Lenses", function() {
    let z = zipCode('08544', '1234');
    let address = new Address('US', 'NJ', 'Princeton', z, 'Alexander St.');
    let student = new Student('444-44-4444', 'Joe', 'Smith',
        'Princeton University', 1960, address);

    let zipPath = ['address', 'zip'];
    var zipLens = R.lensPath(zipPath);
    assert.deepEqual(R.view(zipLens, student), z);

    let beverlyHills = zipCode('90210', '5678');
    let newStudent = R.set(zipLens, beverlyHills, student);
    assert.deepEqual(R.view(zipLens, newStudent).code(), beverlyHills.code());
    assert.deepEqual(R.view(zipLens, student), z);
    assert.ok(newStudent !== student);
});


QUnit.test("Negation", function() {
    function negate(func) {
        return function() {
            return !func.apply(null, arguments);
        };
    }

    function isNull(val) {
        return val === null;
    }

    let isNotNull = negate(isNull);
    assert.ok(!isNotNull(null)); //-> false
    assert.ok(isNotNull({})); //-> true
});


QUnit.test("Immutable setters", function() {
    // thanks to feedback from ChernikovP
    class Address {
        constructor(street) {
            this.street = street;
        }
    }

    class Person {
        constructor(name, address) {
            this.name = name;
            this.address = address;

        }
    }

    const person = new Person('John Doe', new Address('100 Main Street'));

    const streetLens = R.lens(R.path(['address', 'street']), R.assocPath(['address', 'street']));

    const newPerson = R.set(streetLens, '200 Broadway Street', person);

    assert.ok(person instanceof Person); // true
    assert.ok(!(newPerson instanceof Person)); // false
    assert.ok(newPerson instanceof Object) // true
});
