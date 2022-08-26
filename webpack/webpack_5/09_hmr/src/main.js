import createEditor from './editor'
import Avator from './avator.jpg'

import './main.css'

const editor = createEditor()
document.body.appendChild(editor)

const img = new Image()
img.src = Avator
document.body.appendChild(img)


// ========== hot module replacement

if (module.hot) {
  let lasEditor = editor
  module.hot.accept('./editor', () => {
    const value = lasEditor.innerHTML
    document.body.removeChild(lasEditor)

    const newEditor = createEditor()
    newEditor.innerHTML = value
    document.body.appendChild(newEditor)

    lasEditor = newEditor
  })
  
  module.hot.accept('./avator.jpg', () => {
    img.src = Avator
  })
}
