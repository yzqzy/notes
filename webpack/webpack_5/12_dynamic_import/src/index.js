const render = () => {
  const hash = window.location.hash || '#posts'

  const mainElement = document.querySelector('.main')

  mainElement.innerHTML = ''

  if (hash === '#posts') {
    import(/* webpackChunkName: 'components' */ './posts/posts').then(
      ({ default: posts }) => {
        mainElement.appendChild(posts())
      }
    )
  } else if (hash === '#album') {
    import(/* webpackChunkName: 'components' */ './album/album').then(
      ({ default: album }) => {
        mainElement.appendChild(album())
      }
    )
  }
}

render()

window.addEventListener('hashchange', render)
