/**
 * Immutable value objects used in the book
 * Author: Luis Atencio
 */
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
}

/**
  2.4 closures and scopes

  we’ll look at using closures to emulate private variables, fetch data from the server, and force block-scoped variables
  A closure is a data structure that binds a function to its environment at the moment it’s declared.

  It’s based on the textual location of the function declaration; therefore,
  a closure is also called a static or lexical scope surrounding the function definition

  The rules that govern the behavior of a function’s closure are closely related to
  JavaScript’s scoping rules. A scope groups a set of variable bindings and defines a sec-
  tion of code in which a variable is defined.
**/

function zipCode(code, location) {
    let _code = code;
    let _location = location || '';
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
}

module.exports = {
    coordinate: coordinate,
    zipCode: zipCode
};
