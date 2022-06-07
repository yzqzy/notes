import React from 'react'
import ReactDOM from 'react-dom/client'

// import Hello from './components/demo/Hello'
// import HelloClass from './components/demo/HelloClass'
// import HelloHOC from './components/demo/HelloHOC'
// import HelloHooks from './components/demo/HelloHooks'
import Root from './routers';

import './index.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    {/* <Hello name='typescript' />
    <HelloClass name='typescript' />
    <HelloHOC name='typescript' loading={true} />
    <HelloHOC name='typescript' loading={false} />
    <HelloHooks name='typescript' /> */}
  <Root />
  </React.StrictMode>
)
