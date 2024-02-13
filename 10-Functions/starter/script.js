'use strict';

// DEFAULT PARAMETERS IN FUNCTIONS
/* const bookings = [];
const createBooking = function (flightNum, numPassengers = 1, price = 199) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800); */

// ARGUMENT BY VALUE VS. BY REFERENCE (there is only pass by value in JavaScript, no pass by reference except)
/* const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 23444232457,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passport === 23444232457) {
    alert('checked in');
  } else {
    alert('wrong passport!');
  }
};

// checkIn(flight, jonas);
// console.log(flight);
// console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(jonas);
//checkIn(flight, jonas); */

// FUNCTIONS ACCEPTING CALLBACK FUNCTIONS
/* const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// higher order function (one that takes function as parameter)
const transformer = function (str, fn) {
  console.log(`original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);
  console.log(`transformed by: ${fn.name}`);
};

transformer('JavaScript is the best', upperFirstWord);
transformer('JavaScript is the best', oneWord);

// JS uses callback functions all the time
const high5 = function () {
  console.log('high 5');
};

document.body.addEventListener('click', high5); */

// FUNCTIONS THAT RETURN OTHER FUNCTIONS
/* const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('hey');
greeterHey('jonas');
greeterHey('steven');

greet('hello')('jonas');

// rewrite greet using arrow functions
const greetTwo = greeting => {
  return name => {
    console.log(`greetingTwo: ${greeting} ${name}`);
  };
};

greetTwo('hellooooo')('uncle Leo!'); */

// THE CALL AND APPLY METHODS
/* const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(636, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does not work as intended
// book(23, 'Sarah Williams');

book.call(eurowings, 23, 'sarah williams');
book.call(lufthansa, 239, 'mary cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'aleks veg');

// apply method - same ass call but takes array after spesifying what object to call(swiss in this case)
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData); // spread operator used on array

// Bind method
// book.call(eurowings, 23, 'sarah williams');
const bookEW = book.bind(eurowings); // this binds the book function to the eurowings object
bookEW(23, 'Steven Williams'); // does not need to specify object via params after that

// bind the function for the rest of the objects
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

const bookEW23 = book.bind(eurowings, 23); // here we bind the function for eurowings AND the flight number
bookEW23('aleksander');

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => {
  return value + value * rate;
};
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));

// rewrite this - my challenge solution
const addTaxTwo = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

// working correctly
const addVAT2 = addTaxTwo(0.23)(100);
console.log(addVAT2); */

// CODING CHALLENGE #1
/* const poll = {
  question: 'what is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates array with [0, 0, 0, 0]
  answers: new Array(4).fill(0),
};

// display the reuslts in answers from poll object
const displayResults = function (array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
};

// create method for registering new options
poll.registerNewAnswer = function (answer) {
  prompt(`${poll.question} 
  ${poll.options[0]}
  ${poll.options[1]}
  ${poll.options[2]}
  ${poll.options[3]}
  (write option number)`);

  if (typeof answer === Number) {
    if (answer >= 0 && answer <= poll.options.length) {
      poll.answers[answer] += 1;
    }
  }
  displayResults(poll.answers);
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer); */

/* const runOnce = function () {
  console.log(`this will never run again`);
};

// since this is in parenthesis it will run automatically without being 'invoked'
(function () {
  console.log(`this will never run again`);
})();

// CLOSURES
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

// booker now contains the returned function inside secureBooking
const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker); */

// Example 1 - closures
/* let f;

let g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};
g();
f();
console.dir(f);
// re-assigning f() function;
h();
f();
console.dir(f);

// Example 2 - closures
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`we are now boarding all ${n} passengers`);
    console.log(`there are three groups, all with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`will start boarding in ${wait} seconds `);
};

boardPassengers(180, 3);
 */

// CODING CHALLENGE 2 - CLOSURES

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.body.addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
