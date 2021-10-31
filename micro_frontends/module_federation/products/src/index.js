import faker from "faker"

let products = ""

for (let i = 1; i <= 5; i++) {
  products += `<div>${faker.commerce.productName()}</div>`
}

document.querySelector("#dev-products").innerHTML = products
