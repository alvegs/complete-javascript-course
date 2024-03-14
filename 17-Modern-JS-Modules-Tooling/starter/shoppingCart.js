// Exporting module
console.log('Exporting module');

// Blocking code - the 'script' who is importing this module must wait until this module is loaded
// console.log('start fetching users');
// await fetch('https://jsonplaceholder.typicode.com/posts');
// console.log('finish fetching users');

const shippingCost = 10;
export const cart = [];

export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// default exports
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} was added to the cart`);
}
