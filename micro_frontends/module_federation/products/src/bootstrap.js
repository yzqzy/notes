import faker from "faker"

// let products = ""

// for (let i = 1; i <= 5; i++) {
//   products += `<div>${faker.commerce.productName()}</div>`
// }

// document.querySelector("#dev-products").innerHTML = products

function mount (el) {
  let products = ""

  for (let i = 1; i <= 5; i++) {
    products += `<div>${faker.commerce.productName()}</div>`
  }

  el.innerHTML = products;
}

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#dev-products');

  if (el) mount(el);
}

export { mount };
