import createHeading from './headling'
import Avator from './avator.jpg'

import './main.css'

const headling = createHeading()
document.body.append(headling)

const img = new Image()
img.src = Avator
document.body.append(img)

// ========== fetch proxy api example
const isProd = process.env.NODE_ENV === 'production'
const url = isProd ? 'https://api.github.com/users' : '/api/users'

const ul = document.createElement('ul')

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (Array.isArray(data)) {
      data.forEach(item => {
        const li = document.createElement('li')        
        li.textContent = item.login
        ul.append(li)
      })

      document.body.append(ul)
    }
  })
  

// eg：souce map testing
console.log22('source map testing')
