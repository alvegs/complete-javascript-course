'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //   countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.region;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;

  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${flag}" />
      <div class="country__data">
        <h3 class="country__name">${name}</h3>
        <h4 class="country__region">${region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${language}</p>
        <p class="country__row"><span>💰</span>${currency}</p>
      </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

///////////////////////////////////////
// old school way to do http requests

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(request.responseText);
    console.log(data);
    // render country 1
    renderCountry(data);

    // get neighbour country
    const neighbour = data.borders?.[0];
    // AJAX call 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText); // this points to request2

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');
 */

// NEW way to do it - promise (a container for a future value )

// Version 1
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// Version 2 - same function refactored to array functions
/* 
const getJSON = function (url, errorMsg = 'something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} ${response.status}`);
    }

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://restcountries.com/v3.1/name/${country}`, `country not found`)
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      // country 2 - chained fetch
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`country not found ${response.status}`);
      }

      return response.json();
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      renderError(`something went wrong - ${err.message}. Try again`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
}); */

// CODING CHALLENGE 1
// note to self - the api used does not contain population, currency or flag

/* const renderCountry2 = function (data, className = '') {
  const name = data.countryName;
  //const flag = data.flags.svg;
  const region = data.continent;
  //const language = Object.values(data.languages)[0];
  //const currency = Object.values(data.currencies)[0].name;

  const html = `
      <article class="country ${className}">
        <img class="country__img" src="" />
        <div class="country__data">
          <h3 class="country__name">${name}</h3>
          <h4 class="country__region">${region}</h4>
          <p class="country__row"><span>👫</span>${(
            +data.population / 1000000
          ).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>""</p>
          <p class="country__row"><span>💰</span>""</p>
        </div>
      </article>
      `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const whereAmI = async function (lat, lng) {
  return fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.countryName}.`);
      renderCountry2(data, data[4]);
    })
    .catch(err => `Something went wrong - ${err.message} 💔`)
    .finally(() => (countriesContainer.style.opacity = 1));
};

whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
 */
// data.city
// data.countryName
// data[4] = country

// THE EVENT LOOP IN PRACTICE
/* console.log('test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('resolved promise 1').then(res => console.log(res));

// to simulate task that takes long time - but still prioritized before the setTimeout call-back function.
Promise.resolve('resolved 2').then(res => {
  // this goes to the micro stack
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('test end'); */

// BUILDING A SIMPLE PROMISE
/* const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🎉');
    } else {
      reject(new Error('You LOST your money 👎'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// promisifying setTimeout
const wait = seconds => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem')).catch(x => console.error(x)); */

/* const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );

    // this is the same as the commented out code snippet above
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosition().then(pos => console.log(pos)); */

////////////////////////////////////////
// CODING CHALLENGE 2
////////////////////////////////////////

/* const imgContainer = document.querySelector('.images');

// function for waiting
const wait = seconds => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('image not found'));
    });
  });
};

let currentImg;

createImage('img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('img 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
 */

// ASYNC / AWAIT - another way to work with promises

const whereAmI = async function (country) {
  // the old way
  // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

  // the new way with async / await
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const data = await res.json();
  renderCountry(data[0]);
};

whereAmI('portugal');
console.log('FIRST');
