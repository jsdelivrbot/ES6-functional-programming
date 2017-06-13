/**
  Aunque JS primitive types no pueden ser cambiados, el estado de una var
  que referencia a un tipo primitivo, sí puede.
  Por tanto, tenemos que ser capaces de propocionar o al menos emular,
  immutable references to data, así, user-defined objects behave as if the were
  immutable

  NO ES SUFICIENTE CON const keyword, "const" es váido para variables
  pero no para objectos.
**/
const Student = require('../model/Student.js').Student;
const ValueObjects = require('../model/value_objects.js');
const zipCode = ValueObjects.zipCode;
const coordinate = ValueObjects.coordinate;

const gravity_ms = 9.806;
const student = new Student('Alonzo', 'Church', '666-66-6666', 'Princeton');

// gravity_ms = 20;
student.lastname = 'Mourning';

/**
  Value Object pattern

  A value object is one whose equality doesn’t depend on identity or reference,
  just on its value; once declared, its state may not change.
**/

const princetonZip = zipCode('08544', '3345');
const greenwich = coordinate(51.4778, 0.0015);

console.log(greenwich.translate(10, 10).toString()); //-> '(61.4778, 10.0015)'
console.log(greenwich.toString()); //-> '(51.4778, 0.0015)'
console.log(princetonZip.toString()); //-> '08544-3345'
