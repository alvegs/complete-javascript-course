// Remember, we're gonna use strict mode in all scripts now!
'use strict';

const x = 22;

if (x === 22) {
  console.log(x);
}

// find difference lowest and highest temp in the array
const temperatures = [-3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTempAmplitude = function (temps) {
  let high = temps[0];
  let low = temps[1];

  for (let i = 0; i < temps.length; i++) {
    if (typeof temps[i] !== 'number') {
      continue;
    } else {
      if (temps[i] > high) {
        high = temps[i];
      } else if (temps[i] < low) {
        low = temps[i];
      }
    }
  }
  return high - low;
};

console.log(calcTempAmplitude(temperatures));

// coding challenge 1
const printForecast = function (arr) {
  let str = '...';

  for (let i = 0; i < arr.length; i++) {
    str += ` ${arr[i]}°C in ${i + 1} days ...`;
  }
  return str;
};
const testData = [17, 21, 23];

console.log(printForecast(testData));
