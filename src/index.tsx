import './whyr'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { DevTools, loadServer } from 'jira-dev-tool'
import 'antd/dist/antd.less'

// fetch('http://localhost:3000/static/js/bundle.js').then(async res =>{
//   console.log(await res.text())
// })


loadServer(() => (
  ReactDOM.render(
    <>
      <DevTools />
      <App />
    </>,
    document.getElementById('root')
  )
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
