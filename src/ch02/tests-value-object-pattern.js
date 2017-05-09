"use strict";

QUnit.module('Chapter 2, value object pattern');

const R = require('ramda');
const ValueObjects = require('../model/value_objects.js');
const zipCode = ValueObjects.zipCode;
const coordinate = ValueObjects.coordinate;

QUnit.test('It checks the correct use from value object pattern', function() {
    const princetonZip = zipCode('08544', '3345');
    const greenwich = coordinate(51.4778, 0.0015);

    assert.equal(greenwich.toString(), '(51.4778,0.0015)');
    assert.equal(princetonZip.toString(), '08544-3345');
});
