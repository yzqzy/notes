import faker from "faker"

// document.querySelector("#dev-cart").innerHTML = `在您的购物车中有${ faker.random.number() }件商品`

function mount (el) {
  el.innerHTML = `在您的购物车中有${ faker.random.number() }件商品`
}

export { mount };
