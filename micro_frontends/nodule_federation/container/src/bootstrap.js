import { mount as mountProducts } from "products/Index"
import { mount as mountCart } from "cart/Index"

mountProducts(document.querySelector("#prod-products"))
mountCart(document.querySelector("#prod-cart"))
