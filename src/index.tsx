import './whyr'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { DevTools, loadServer } from 'jira-dev-tool'
import { AppProviders } from 'context'
import 'antd/dist/antd.less'


loadServer(() => (
  ReactDOM.render(
    <AppProviders>
      <DevTools />
      <App />
    </AppProviders>,
    document.getElementById('root')
  )
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
