import React from 'react'
import ReactDOM from 'react-dom/client'
import Hello from './components/Hello'
import HelloClass from './components/HelloClass'
import HelloHOC from './components/HelloHOC'

import './index.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Hello name='typescript' />
    <HelloClass name='typescript' />
    <HelloHOC name='typescript' loading={true} />
    <HelloHOC name='typescript' loading={false} />
  </React.StrictMode>
)
