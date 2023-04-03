import FormRender from './FormRender'
import metaConfig from './meta.config'

import './App.css'

function App() {
  return (
    <div className="App">
      <FormRender meta={metaConfig} />
    </div>
  )
}

export default App
