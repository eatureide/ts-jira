import { Routes, Route } from 'react-router'
import { BrowserRouter as Router, Navigate } from 'react-router-dom'
import { LoginScreen } from 'pages/login'
import { List } from 'pages/list'
import { Kanban } from 'pages/kanban'
import { Privite } from 'components/privite'
import * as Demo from 'pages/demo'

function App() {

  return (
    <Router>
      <Routes>
        <Route path={`/list`} element={<Privite><List /></Privite>} />
        <Route path={`/login`} element={<LoginScreen />} />
        <Route path={`/kanban`} element={<Privite><Kanban /></Privite>} />
        <Route path={`/demo`} element={<Privite><Demo.A /></Privite>} />
        <Route path={'*'} element={<Navigate to={'list'} />} />
      </Routes>
    </Router>
  )
}

export default App
