'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2024-02-17T17:01:17.194Z',
    '2024-02-20T23:36:17.929Z',
    '2024-02-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2024-02-17T14:43:26.374Z',
    '2024-02-20T18:49:59.371Z',
    '2024-02-21T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // return `${day}/${month}/${year}`; // convert milliseconds to days
  return new Intl.DateTimeFormat(locale).format(date);
};

// formatting currencies
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(out, acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// logout timer
const startLogOutTimer = function () {
  const tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, '0');
    let sec = String(time % 60).padEnd(2, '0');
    // in each callback call - print remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    // decrease time by 1 sec
    time--;
  };
  // setting the time to 5 min
  let time = 300;
  // call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN <-------------------------------------------------
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Current date and time
    // const date = new Date(acc.movementsDates[i]);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // could also use 'long' -> month name
      year: 'numeric', // could also use '2-digit'
      // weekday: 'long',
    };
    const locale = navigator.language;

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // clear timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // clear timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/* console.log(23 === 23.0); // all numbers in js is float / decimasls (in 64 base2 format - only 0 and 1)

// base 10 -> 0 - 9
// base 2 -> 0 - 1
console.log(0.1 + 0.2); // example this : will not be 0.3 as it should ... it will be 0.300000000000000004
console.log(0.1 + 0.2 === 0.3); // as stated above

// convert strings to numbers
console.log(Number('23'));
console.log(+'23'); // type coercion

// Parsing
console.log(Number.parseInt('30px', 10)); // takes the number in the string and turns to int - (string must start with number!)
console.log(Number.parseInt('e23', 10)); // doesnt start with number -> NaN

console.log(Number.parseFloat('2.5rem')); // parsing num
console.log(Number.parseInt('2.5rem')); // reading parseInt on float number only returns number in front of decimal
console.log(Number.isNaN(20)); // returns true if not a number, and false if is number
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0)); // illegal math

// checking if number (real number, not string)
console.log(Number.isFinite(20));
console.log(Number.isFinite('20')); // better for use to check if number or not
console.log(Number.isFinite(+'20X')); // should be false
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23)); // true
console.log(Number.isInteger(23.0)); // true - since all nums are floating points and 23 === 23.0
console.log(Number.isInteger(23 / 0)); // false
 */

/* console.log(Math.sqrt(25)); // square root of number
console.log(25 ** (1 / 2)); // the same but with exponential notation

console.log(Math.max(5, 8, 13, 23, '25')); // does coercion and returns largest
console.log(Math.max(4, 3, 12, '23px', 90)); // nan - since not parseing strings - can only use clean "number strings"

console.log(Math.min(2, 8, 7, 9, 12));

console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

console.log(randomInt(10, 20));

// rounding integers
console.log(Math.round(23.9)); // rounds to nearest integer
console.log(Math.trunc(23.9)); // removes decimal

console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9)); // both will round up to nearest integer

console.log(Math.floor(22.9));
console.log(Math.floor(22.1)); // rounds down to nearest integers - also does type coercion

console.log(Math.trunc(-21.9));
console.log(Math.floor(-21.9));

// rounding floating point / decimals
console.log((2.7).toFixed(0)); // toFixed returns string and NOT number - parameter is num of decimals
console.log(Number(2.7).toFixed(3)); // also string
console.log(+(2.7).toFixed(2)); // with '+' operator it becomes regular number */

// Modulo operator / the remainder operator
/* console.log(5 % 2); // gives the remainder of whole integer division - > 5 / 2 = 2 * 2 + 1 -> 1 is remainder
console.log(5 / 2);

console.log(8 % 3); // remainder = 2
console.log(8 / 3);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(9));

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
}); */

// 287, 460, 000, 000
/* const diameter = 287_460_000_000; // use underscore as thousand-separator for readability
console.log(diameter); // compilator ignores the underscores and prints regular number

const price = 345_99; // represents 345 dollars 99 cents
console.log(price);

const transferFee = 15_000;

const PI = 3.1415; // we can only use underscore between numbers, not before or after '.' or other signs (not two in a row)
console.log(PI);

console.log(Number('230_000')); // we can not do it with converting -> NaN
console.log(+'23_00'); // can not use with coersion -> NaN */

/* console.log(2 ** 53 - 1);
// the largest integer which can be used safely - meaning numbers greater than this can lose precision
console.log(Number.MAX_SAFE_INTEGER);

// BIGINT
console.log(41238942109851209751027501725n); // by using 'n' at the end turns int -> bigInt
console.log(BigInt(412389421098));

// operations / operators
console.log(10_000n + 10_000n);
console.log(3214151098147140985n * 100000n);

const huge = 2341512421830977512098401n;
const num = 23;
// console.log(huge * num); // cannot do calculations including regular int and big int -> then have to turn int -> bigInt
// console.log(Math.sqrt(25n)); // will not work - cannot turn bigInt into Number
// Exceptions - logical operators
console.log(20n > 15); // this is fine since not calculating only evaluating
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == 20);

console.log(huge + ' is really big');

// Divisions
console.log(10n / 3n);
console.log(10 / 3); */

// Create a date - 4 ways to do so
/* const now = new Date();
console.log(now);

console.log(new Date('Feb 21 2024 20:08:17'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

// date with year, month, day, hour, min, sec - but month is 0 based -> 0 = Jan, 10 = Nov and NOT Oct!!!
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31)); // JS will here autocorrect since Nov only has 30 days - output will be Dec 01
console.log(new Date(2037, 10, 33)); // <-- Dec 03 (autocorrected)

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000)); */

// Working with dates - methods on dates
/* const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // always use getFullYear - returns the year
console.log(future.getMonth()); // returns month (0-based)
console.log(future.getDate()); // returns day of month
console.log(future.getDay()); // return day of the week, NOT month (so sunday = 0, monday = 1 ... )
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(new Date().getTime()); // returns the number of milliseconds that has passed since 01.01.1970 -> 2142253380000

console.log(1708543909251 / (1000 * 60 * 60 * 24 * 365)); // return number of years since 01.01.1970 -> 54.xxxxxxxx

console.log(new Date(2142253380000));

console.log(Date.now());

console.log(future.setFullYear(2040));
console.log(future); */

// Calculations with dates
/* const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) => {
  return Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); // convert milliseconds to days
};

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1);
 */

// INTERNATIONALIZING NUMBERS(INTL)
/* const num = 3884764.23;

const options = {
  style: 'currency', // unit, percent and currency options for style
  unit: 'celsius',
  currency: 'EUR',
  useGrouping: false,
};

console.log('US: ', Intl.NumberFormat('en-US', options).format(num));
console.log('Germ: ', Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria: ', Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  'Browser local: ',
  Intl.NumberFormat(navigator.language, options).format(num)
); */

// SetTimeout and SetInterval methods
/* 
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);

console.log('waiting...');

if (ingredients.includes('spinach')) {
  clearTimeout(pizzaTimer); // clears the timeout if the ingredients includes 'spinach' - as in the code will not be run
}

// SetInterval
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 3000);

const clock = setInterval(function () {
  const time = new Date();
  console.log(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);
}, 1000); */
