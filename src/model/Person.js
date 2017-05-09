/**
 * Person object
 * Domain model object for LMS use cases covered in the book
 * Author: Luis Atencio
 */
exports.Person = class Person {
    constructor(ssn, firstname, lastname, birthYear = null, address = null) {
        this._ssn = ssn;
        this._firstname = firstname;
        this._lastname = lastname;
        this._birthYear = birthYear;
        this._address = address;
    }

    get ssn() {
        return this._ssn;
    }

    get firstname() {
        return this._firstname;
    }

    set firstname(firstname) {
        this._firstname = firstname;
        return this;
    }

    get lastname() {
        return this._lastname;
    }

    get birthYear() {
        return this._birthYear;
    }

    get address() {
        return this._address;
    }

    get fullname() {
        return `${this._firstname} ${this._lastname}`;
    }

    /**
      Usando setter methods no significa soportar object mutations, pero es una
      manera de crear objetos fácilmente sin tener un constructor excesivamente
      largo.
    **/

    set birthYear(year) {
        this._birthYear = year;
    }

    set address(addr) {
        this._address = addr;
    }

    peopleInSameCountry(friends) {
        var result = [];
        for (let idx in friends) {
            var friend = friends[idx];
            if (this.address.country === friend.address.country) {
                result.push(friend);
            }
        }
        return result;
    }
};
