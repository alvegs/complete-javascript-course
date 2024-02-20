'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1}</div>
      <div class="movements__value">${mov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};

calcDisplayBalance(account1);

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1);

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
  // display movements
  displayMovements(acc.movements);
  // display balance
  calcDisplayBalance(acc);
  // display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // prevent form from submitting
  e.preventDefault();
  console.log('login');
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);

    // update UI
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
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

/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]); */

/////////////////////////////////////////////////

/* let arr = ['a', 'b', 'c', 'd', 'e'];

// slice - extract part of an array without changeing the original object
console.log(arr.slice(2)); // starts from 2 - to the end (2 = c)
console.log(arr.slice(2, 4)); // starts at index 2 - goed to index 4(excluded)
console.log(arr.slice(-2)); // starts from the second last and goes to the end.
console.log(arr.slice(-1));
console.log(arr.slice(1, -1)); // starts at index 1 and goes to the last one (excluded)

// Splice method - the same as slice BUT changes the original object it's working on
// console.log(arr.splice(2));
arr.splice(-1); // removes the last element
console.log(arr);
arr.splice(1, 2); // starts at index 1 (and removes it) - and goes on to remove 2 elements

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e']; // restore arr back to normal
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // reverses the orter of the array - mutates the original object

// CONCAT
const letters = arr.concat(arr2); // concatenates 2 arrays - must spesicy second one in param.
console.log(letters);
console.log(...arr, ...arr2); // this gives the same result - does not mutate the objects

// JOIN
console.log(letters.join(' - ')); // takes the array and joins elements with param ( in this case: a - b - c - d ... ) */

/* const arr = [23, 11, 64]; // simple array to work with

// AT - get the element at given index-pos
console.log(arr[0]);
console.log(arr.at(0));

// getting elements in array - all these gives same answer - but 'at' is best for this case
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(0)); // 'at'-method also works on strings */

// FOR-OF-LOOP
/* const movementsDup = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movementsDup) {
for (const [i, movement] of movementsDup.entries()) {
  if (movement > 0) {
    console.log(`Movements ${i + 1}: you deposited ${movement} `);
  } else {
    console.log(`Movements ${i + 1}: you withdrew ${Math.abs(movement)}`);
  }
}

// FOREACH
console.log('----- FOREACH -----');
movementsDup.forEach(function (mov, index, arr) {
  if (mov > 0) {
    console.log(`Movement ${index}: you deposited ${mov} `);
  } else {
    console.log(`Movement ${index}: you withdrew ${Math.abs(mov)}`);
  }
}); */

// MAPS

/* const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SET
const currenciesUnique = new Set('USD', 'GBP', 'USD', 'EUR', 'EUR');

// sets dont have keys, so we just une '_' that means throw away argument / variable
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
}); */

// CODING CHALLENGE 1

// arrays with data to be used in challenge
/* const julia1 = [3, 5, 2, 12, 7];
const kate1 = [4, 1, 15, 8, 3];

const julia2 = [9, 16, 6, 8, 3];
const kate2 = [10, 5, 6, 1, 4];

const checkDogs = function (arr1, arr2) {
  const total = arr1.concat(arr2);
  total.forEach(function (dogAge, i) {
    if (dogAge >= 3) {
      console.log(`Dog nr: ${i + 1} is an adult and is ${dogAge} years old`);
    } else {
      console.log(`Dog nr: ${i + 1} is still a puppy🐩`);
    }
  });
};

const julia1Dup = julia1.slice(1, 3);

checkDogs(julia1Dup, kate1);
checkDogs(julia2, kate2); */

// MAP METHOD

/* const euroToUSD = 1.1;

const movementsUSD = movements.map(mov => mov * euroToUSD);

console.log(movements);
console.log(movementsUSD);

// same code with FOR-OF-LOOP
const movementsUDSfor = [];
for (const mov of movements) {
  movementsUDSfor.push(mov * euroToUSD);
}

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions); */

// FILTER METHOD
/* const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

// the same as above but with FOR-OF-LOOP
const depositsFor = [];
for (const mov of movements) {
  if (mov > 0) {
    depositsFor.push(mov);
  }
}
console.log(depositsFor);

// SEMI-CHALLENGE (return just the negative numbers from movements array)
const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals); */

// REDUCE METHOD (boil down all values in an array to one value (f.eks: add all numbers))

// accumulator is like a snowball
/* const balance = movements.reduce((acc, cur) => acc + cur, 0); // the 0 is the initial value of the accumulator ('acc')
console.log(balance);

// the same as above with for-loop
let balance2 = 0;
for (const mov of movements) {
  balance2 += mov;
}
console.log(`balance2 for-loop: ${balance2}`);

// Maximum value of movements
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);

console.log(max); */

// CODING CHALLENGE 2
/* const calcAverageHumanAge = function (ages) {
  const humanYears = ages.map(age => (age <= 2 ? age * 2 : 16 + age * 4));

  const filteredYears = humanYears.filter(age => age >= 18);
  console.log(`humanyears : ${humanYears}`);
  console.log(`filtered: ${filteredYears}`);

  const avg = filteredYears.reduce(
    (acc, val, i, arr) => acc + val / arr.length,
    0
  );

  return avg;
};

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);

console.log(`avg 1: ${avg1}, avg 2: ${avg2}`); */

// CHAINING METHODS
/* const euroToUSD = 1.1;
const totaltDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUSD)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totaltDepositsUSD); */

// CODING CHALLENGE 3 - CHAINING METHODS
/* const calcAverageHumanAge = ages => {
  const average = ages
    .map(age => (age <= 2 ? age * 2 : 16 + age * 4))
    .filter(age => age >= 18)
    .reduce((acc, val, i, arr) => acc + val / arr.length, 0);

  return average;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
 */

// FIND METHOD - method for searching after condition (takes callback function as argument)
/* const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(accounts);
//
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// the same with FOR-OF-LOOP
const res = function (name) {
  let match = {};
  for (const own of accounts) {
    if (own.owner === name) {
      match = own;
    }
  }
  return match.owner;
};

console.log(res('Jessica Davis') + ' from for loop');
 */

/* // SOME and EVERY methods
console.log(movements);
// checks for equality
console.log(movements.includes(-130));

// SOME METHOD - checks for condition
const anyDepositis = movements.some(mov => mov > 5000);
console.log(anyDepositis);

// EVERY method - only returns true if ALL element pass certain condition
console.log(movements.every(mov => mov > 0)); // false
console.log(account4.movements.severy(mov => mov > 0)); // true

// separate callback function
const deposit = mov => mov > 0;
console.log(movements.some(deposit)); */

// FLAT AND FLATMAP
/* const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat()); // this makes one array from arr

// deeply nested arrow
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // with '2' we specify the level of flattening of nested arrows

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);

// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overalBalance = allMovements.reduce((acc, move) => acc + move, 0);
// console.log(overallBalance);

// flat - with chaining
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(overalBalance);

// flatmap
const overalBalance2 = accounts
  .flatMap(acc => acc.movements) //flatmap takes same parameters as map - but also flattens (also just 1 level of flattening)
  .reduce((acc, mov) => acc + mov, 0); */

// SORTING ARRAYS
/* const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // sort also mutates
console.log(owners);

// Numbers - sorting numbers
console.log(movements);
//console.log(movements.sort()); // does not work

// return < 0 'a' will be before 'b' (keep order)
// return > 0 'b' will be before 'a' (switch order)
// ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (b > a) return -1;
// });
movements.sort((a, b) => a - b); // improved version of the code above
console.log(movements);

// descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (b > a) return 1;
// });
movements.sort((a, b) => b - a); // improved version

console.log(movements); */

// ALTERNATIVES TO CREATING AND FILLING ARRAYS
/* console.log([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 8, 9));

// the new way
const x = new Array(7); // creates new array with 7 elements
console.log(x);
x.fill(1, 3);
console.log(x);

// array.from()
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function (e) {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    movementsUI.map(el => Number(el.textContent.replace('€', '')))
  );
  console.log(movementsUI);
});
 */

////////////////////////////////////
// ARRAY METHODS IN PRACTICE
////////////////////////////////////

// 1.
/* const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => cur + sum, 0);
console.log(bankDepositSum);

// 2.
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov >= 1000).length;
//.reduce((sum, _) => (sum += 1), 0); // <-- can use this instead of length
console.log(numDeposits1000);

let a = 10;
console.log(a++); // '++' operator increments the value - but returns the previous value (which can be a problem at times)

// 3.
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title
const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'but', 'or', 'the', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice titls'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE')); */

// CODING CHALLENGE 4

// TEST DATA - array with objects
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1. add new property of recommended food in kgs
// for (const dog of dogs) {
//   dog.recommendedFood = Number((dog.weight ** 0.75 * 28) / 1000).toFixed(2);
// }
// console.log(dogs);

// alternative with map
dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);

// 2. find sarahs dog and find out if it eats to much or to little
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
const eatsEnough = dogSarah.curFood > dogSarah.recFood ? 'much' : 'little';

console.log(`Sarah's dog is eating too ${eatsEnough}`);

// 3. array with dogs who eat to much and too little (separate arrays)
const dogsEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

const dogsEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owners);

console.log(dogsEatTooMuch);
console.log(dogsEatTooLittle);

// 4.
console.log(`${dogsEatTooMuch.join(' and ')}'s dogs eat to much`);
console.log(`${dogsEatTooLittle.join(' and ')}'s dogs eat to little`);

// 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6.
const checkEatingOK = dog =>
  dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;

console.log(dogs.some(checkEatingOK));

// 7.
console.log(dogs.filter(checkEatingOK));

// 8.
const sortedAscendingByRecFood = dogs
  .slice()
  .sort((a, b) => a.recFood - b.recFood);
console.log(ascending);
