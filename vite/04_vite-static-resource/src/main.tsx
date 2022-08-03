import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import 'virtual:svg-icons-register'
import allKeys from 'virtual:svg-icons-names'

console.log(allKeys)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
