"use strict";

QUnit.module('Chapter 2');

const sinon = require('sinon');

const makeAddFunction = require('./scope').makeAddFunction;

QUnit.test('It checks the correct use of the closures', function() {
    const makeAddFunctionSpy = sinon.spy(makeAddFunction);
    const mockNumber = 10;
    const result = makeAddFunctionSpy(mockNumber)(mockNumber);

    assert.ok(makeAddFunctionSpy.withArgs(mockNumber).calledOnce);
    assert.equal(makeAddFunctionSpy.returnValues[0](mockNumber), mockNumber + mockNumber);
});


/**

  SINON TESTING UNIT, TEST SPY

  A test spy is a function that records arguments,
  return value, the value of this and exception thrown (if any) for all its calls.
  There are two types of spies: Some are anonymous functions,
  while others wrap methods that already exist in the system under test.

**/
