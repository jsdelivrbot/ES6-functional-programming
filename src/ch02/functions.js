/**
  Imperative and procedural programming are mostly made up of ordered sequences of statements; but FP is
  entirely expressional, so void functions don’t serve a purpose in this paradigm.
  JavaScript functions have two important characteristics that are the bread and butter of its functional style: they’re first-class and higher-order.

  Functions as first-class citizens
  In JavaScript, the term first-class comes from making functions actual objects in the language—also called first-class citizens.
**/

function multiplier(a, b) {
    return a * b;
}

// Assigned to variables as an anonymous function or lambda expression

var square = x => x * x;

var square = function(x) {
    return x * x;
}

// Assigned to object properties as methods

var obj = {
    method: function(x) {
        return x * x;
    }
};

/**
  Although not common practice, functions can also be instantiated via constructors,
  which is proof of their first-class nature in JavaScript.
  The constructor takes the set of formal parameters, the function body, and the new keyword.
**/

var multiplier = new Function('a', 'b', 'return a * b');
multiplier(2, 3); //-> 6

/**
  In JavaScript, every function is an instance of the Function type.
  A function’s length property can be used to retrieve the number of formal parameters, and methods such
  as apply() and call() can be used to call functions with contexts
**/

// Array.sort(comparator)

var fruit = ['Coconut', 'apples'];

fruit.sort(); // ->['Coconut', 'apples']
var ages = [1, 10, 21, 2];

ages.sort(); // ->[1, 10, 2, 21]

/**
  As a result, sort() is a function whose behavior is frequently driven by the criteria
  implemented in the comparator function, which by itself is almost useless

  In addition to being assignable, JavaScript functions like sort() accept other functions as arguments and belong to a category called higher-order functions
**/

/**
  Because functions behave like regular objects, you can intuitively expect that they can be passed in as function arguments and returned from other functions
**/

function applyOperation(a, b, opt) {
    return opt(a, b);
}
var multiplier = (a, b) => a * b;

applyOperation(2, 3, multiplier); // -> 6

function add(a) {
    return function(b) {
        return a + b; // save the context from add function
    }
}
add(3)(3); //-> 6

// IMPERATIVE CODE
function printPeopleInTheUs(people) {
    for (let i = 0; i < people.length; i++) {
        var thisPerson = people[i];

        if (thisPerson.address.country === 'US') {
            console.log(thisPerson);
        }
    }
}
printPeopleInTheUs([p1, p2, p3]);

function printPeople(people, action) {
    for (let i = 0; i < people.length; i++) {
        action(people[i]);
    }
}
var action = function(person) {
    if (person.address.country === 'US') {
        console.log(person);
    }
}

printPeople(people, action);

// This is the mindset you must develop to fully embrace functional programming.
function printPeople(people, selector, printer) {
    people.forEach(function(person) {
        if (selector(person)) {
            printer(person);
        }
    });
}
var inUs = person => person.address.country === 'US';

printPeople(people, inUs, console.log);

/**
  LOOKING AHEAD
**/

var countryPath = ['address', 'country'];
var countryL = R.lens(R.path(countryPath), R.assocPath(countryPath));
var inCountry = R.curry((country, person) =>
    R.equals(R.view(countryL, person), country));

people.filter(inCountry('US')).map(console.log);
