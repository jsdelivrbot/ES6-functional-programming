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
const gravity_ms = 9.806;
const student = new Student('Alonzo', 'Church', '666-66-6666', 'Princeton');

// gravity_ms = 20;
student.lastname = 'Mourning';

/**
  Value Object pattern

  A value object is one whose equality doesn’t depend on identity or reference,
  just on its value; once declared, its state may not change.
**/
function zipCode(code, location) {
    const _code = code;
    const _location = location || '';
    return {
        code: function() {
            return _code;
        },
        location: function() {
            return _location;
        },
        fromString: function(str) {
            let parts = str.split('-');
            return zipCode(parts[0], parts[1]);
        },
        toString: function() {
            return _code + '-' + _location;
        }
    };
};

function coordinate(lat, long) {
    let _lat = lat;
    let _long = long;
    return {
        latitude: function() {
            return _lat;
        },
        longitude: function() {
            return _long;
        },
        translate: function(dx, dy) {
            return coordinate(_lat + dx, _long + dy);
        },
        toString: function() {
            return '(' + _lat + ',' + _long + ')';
        }
    };
};

const princetonZip = zipCode('08544', '3345');
const greenwich = coordinate(51.4778, 0.0015);

console.log(greenwich.translate(10, 10).toString()); //-> '(61.4778, 10.0015)'
console.log(greenwich.toString()); //-> '(51.4778, 0.0015)'
console.log(princetonZip.toString()); //-> '08544-3345'
