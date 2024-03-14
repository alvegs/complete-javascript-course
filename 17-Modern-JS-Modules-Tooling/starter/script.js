/* // Importing module
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // named import

// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');

// import * as ShoppingCart from './shoppingCart.js'; // imports all exports from shoppingCart
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// don't mix default and named exports - ( see commented out code line right below)
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);

// top level await - (await used outside async function)
// this will now block execution of entire module
// console.log('start fetching');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('something');

const getLastPost = async function () {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);

// not very clean
// lastPost.then(last => console.log(last));

// refactored
const lastPost2 = await getLastPost();
console.log(lastPost2);
 */

/* 
// THE MODULE PATTERN
const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} was added to the cart`);
  };

  const orderStock = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  // return what we want to make publi
  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

shoppingCart2.addToCart('apples', 4);
shoppingCart2.addToCart('pizza', 2);
console.log(shoppingCart2);
 */

import cloneDepp from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    {
      product: 'bread',
      quantity: 5,
    },
    {
      product: 'apple',
      quantity: 12,
    },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDepp(state);

console.log(stateClone);
state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}
