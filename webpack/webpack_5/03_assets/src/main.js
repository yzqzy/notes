import createHeading from './headling'
import './main.css'
import Avator from './avator.jpg'

const headling = createHeading()
document.body.append(headling)

const img = new Image()
img.src = Avator
document.body.append(img)
