'use strict';

/* // constructor function - (JS does not have traditional classes as in other OOP languages)
const Person = function (fullName, birthYear) {
  // instance properties
  this.fullName = fullName;
  this.birthYear = birthYear;

  // NEVER DO THIS (create method in constructor function - bad for performance)
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

// calls the person function - (what happens )
// 1. empty object({}) is created
// 2. function is called - this keyword will be set to the newly created object
// 3. the new object is linked to prototype
// 4. function automatically returns the object
const jonas = new Person('Jonas', 1991);
console.log(jonas);

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

const jay = 'jay';
console.log(jonas instanceof Person);
console.log(jay instanceof Person);

// PROTOTYPES
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
jack.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// read doc of prototype for more info - note to self
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('fullName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
// the one below is Object.prototype - top level
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.log(Person.prototype.constructor);

// CODING CHALLENGE 1
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// methods for car
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed}km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

console.log(bmw);
console.log(mercedes);

mercedes.brake();
bmw.accelerate();
bmw.accelerate();

console.log(bmw);
console.log(mercedes); */

// ES6 Classes

// class expression
// const PersonCl = class {};

// class declaration
/* class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // methods will be added to the .prototype of the PersonCl class - which is prototype of objects from this class
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet = function () {
    console.log(`hey ${this.fullName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  // set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert('the given name is not a full name');
    }
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log(`hey there! 🌜`);
  }
}

// calling static method (only accessible for the constructor function - not instances)
PersonCl.hey();

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

// No need for this when using ES6 classes syntax
// PersonCl.prototype.greet = function () {
//   console.log(`hey ${this.fullName}`);
// };

// GOOD TO KNOW ABOUT CLASSES
// 1. classes are not hoisted
// 2. classes are first-class citizens
// 3. classes are executed in strict mode regardless
// 4. DO NOT use classes without understanding prototypal inheritence - read documentation about this

const walter = new PersonCl('walter White', 1965);
console.log(walter);

// Getters and setters
const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 420],

  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

console.log(account.latest);
// calling the setter as a property and not method call
account.latest = 50;
 */

/* // Object.create
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
// adding properties
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__);

const sara = Object.create(PersonProto);
sara.init('sara', 1979);
sara.calcAge();

/////////////////////////////////////////
// CODING CHALLENGE 2
/////////////////////////////////////////

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going ${this.speed} km/h`);
  }

  get speedUS() {
    return `${this.speed / 1.6} mph`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const audi = new Car('Audi', 180);
audi.accelerate();
audi.accelerate();
audi.brake();

console.log(audi.speedUS);
audi.speedUS = 200;
console.log(audi);
console.log(audi.speedUS); */

/* // INHERITENCE - CONSTRUCTOR FUNCTIONS

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};
// create new student object
const mike = new Student('Mike', 2020, 'ComputerScience');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

// CODING CHALLENGE 3

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

// methods for car
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed}km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed}km/h`);
};

// child class of
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

// set right after constructor function
EV.prototype = Object.create(Car.prototype);
EV.prototype.constructor = EV;

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;

  const decreaseCharge = this.charge / 100;

  this.charge -= decreaseCharge;

  console.log(
    `${this.make} is going ${this.speed}, and battery charge status ${this.charge}`
  );
};

const tesla = new EV('Tesla', 110, 80);
tesla.accelerate();
tesla.accelerate(); */

// INHERITENCE : ES6 CLASSES
/* class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // methods will be added to the .prototype of the PersonCl class - which is prototype of objects from this class
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet = function () {
    console.log(`hey ${this.fullName}`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  // set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) {
      this._fullName = name;
    } else {
      alert('the given name is not a full name');
    }
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey() {
    console.log(`hey there! 🌜`);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // must always be called first in the constructor - just as in Java (for reference)
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${2037 - this.birthYear}, but as a student i feel more like ${
        2047 - this.birthYear
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge(); */

// INHERITENCE BETWEEN "CLASSES" : Object.create

/* const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (fullName, birthYear, course) {
  PersonProto.init.call(fullName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`my name is ${this.fullName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge(); */

// public fields and methods
// private fields and methods

/* class Account {
  // public fiends - will not be on prototype (only on instances)
  local = navigator.language;

  // private fields - not on prototype ( only on instances )
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // protected property ('_' convention before name )
    // this._movements = [];
    // this.local = navigator.language;
  }

  // public methods / public interface
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
  }

  withdraw(value) {
    this.deposit(-value);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('loan approved');
    }
  }

  // private methods
  // #approveLoan(val) <-- this is the private syntax
  _approveLoan(val) {
    // also protected (but can still be acessed - only to marke it as protected - just naming convention)
    return true;
  }
}

// create new account object
const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1);
console.log(acc1.getMovements()); */

// CODING CHALLENGE 4

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going ${this.speed} km/h`);
    return this;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return `${this.speed / 1.6} mph`;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EV extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  accelerate() {
    this.speed += 20;
    console.log(`${this.make} is going ${this.speed} km/h`);
    return this;
  }

  charge(chargeTo) {
    this.#charge = chargeTo;
  }
}

// create object
const rivian = new EV('Rivian', 110, 30);

rivian.accelerate().brake().accelerate();
