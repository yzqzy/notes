import faker from "faker"

function mount(el) {
  el.innerHTML = `在您的购物车中有${faker.random.number()}件商品`
}

if (process.env.NODE_ENV === "development") {
  const el = document.querySelector("#dev-cart")
  if (el) mount(el)
}

export { mount }
