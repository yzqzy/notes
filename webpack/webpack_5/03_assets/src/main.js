import createHeading from './headling'
import Avator from './avator.jpg'

import './main.css'

const headling = createHeading()
document.body.append(headling)

const img = new Image()
img.src = Avator
document.body.append(img)

// cjs
// const createHeading = require('./headling').default
// const Avator = require('./avator.jpg')

// require('./main.css')

// const headling = createHeading()
// document.body.append(headling)

// const img = new Image()
// img.src = Avator
// document.body.append(img)

// AMD
// define(['./headling.js', './avator.jpg', './main.css'], (createHeading, Avator) => {
//   const headling = createHeading.default()
//   document.body.append(headling)

//   const img = new Image()
//   img.src = Avator
//   document.body.append(img)
// })
