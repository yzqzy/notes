import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 用来注入 Windi CSS 所需要的样式
import "virtual:windi.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
