/**
  The add function is lexically bound
  in makeAddFunction and has
  access to the amount variable.
**/

function makeAddFunction(amount) {
    function add(number) {
        return number + amount;
    }
    return add;
}

function makeExponentialFunction(base) {
    function raise(exponent) {
        return Math.pow(base, exponent);
    }
    return raise;
}

module.exports = {
    makeExponentialFunction,
    makeAddFunction
};
