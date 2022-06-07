import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from '../components/App'

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={ <App /> } />
    </Routes>
  </BrowserRouter>
)

export default Root
