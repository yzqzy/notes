import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import fib from 'virtual:fib'
import env from 'virtual:env';

// alert(`结果：${ fib(10) }`)
console.log(env);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
