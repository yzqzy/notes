import './headling.css'

export default () => {
  const element = document.createElement('h2')

  element.textContent = 'Hello World'
  element.classList.add('headling')
  element.addEventListener('click', () => {
    alert('Hello webpack')
  })

  return element
}