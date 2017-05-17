const R = require('ramda');
const Person = require('../model/Person.js').Person;
const Address = require('../model/Address.js').Address;
const ValueObjects = require('../model/value_objects.js');
const zipCode = ValueObjects.zipCode;

/**
  Lenses, also known as functional references, are functional programming’s solution to accessing
  and immutably manipulating attributes of stateful data types.
  Internally, lenses work similarly to a copy-on-write strategy by using an internal storage component that
  knows how to properly manage and copy state
**/

var person = new Person('Alonzo', 'Church', '444-44-4444');
var lastnameLens = R.lensProp('lastName');
var newPerson = R.set(lastnameLens, 'Mourning', person);

newPerson.lastname; //-> 'Mourning'
person.lastname; //-> 'Church'
person.address = new Address('US', 'NJ', 'Princeton', zipCode('08544', '1234'), 'Alexander St.');
var zipPath = ['address', 'zip'];
var zipLens = R.lens(R.path(zipPath), R.assocPath(zipPath));

console.log(R.view(zipLens, person).toString()); //-> zipCode('08544', '1234')
var newPerson = R.set(zipLens, person, zipCode('90210', '5678'));

R.view(zipLens, newPerson); //-> zipCode('90210', '5678')
R.view(zipLens, person); //-> zipCode('08544', '1234')
newPerson !== person; //-> true

/**
  This is great because now you have getter and setter semantics in a functional way.
  In addition to providing a protective immutable wrapper, lenses also fit extremely well
  with FP ’s philosophy of isolating field-access logic away from the object, eliminating
  the reliance on this , and giving you powerful functions that know how to reach into
  and manipulate the contents of any object.
**/
