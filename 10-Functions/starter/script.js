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
const flight = 'LH234';
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
//checkIn(flight, jonas);
