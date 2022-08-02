import _ from 'lodash'

function component() {
  const element = document.createElement('div')

  element.innerHTML = _.join(['hello', 'webpack5'], ' ')
  element.classList.add('hello')

  return element
}

document.body.appendChild(component())
