'use strict';

function calcAge(birth) {
  const age = 2024 - birth;
  console.log(age);
}
calcAge(1991);

const calcAgeArrow = birth => {
  const age = 2024 - birth;
  console.log(age);
  console.log(this);
};
calcAgeArrow(1991);
