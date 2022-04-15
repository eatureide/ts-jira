import { Routes, Route, Navigate } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { Privite } from 'components/privite'
import loadable from 'react-loadable'
import { Spin } from 'antd'
import styled from '@emotion/styled'

const LoadingBox = styled.div`
    position: 'fixed';
    top: 0;
    left: 0;
    width: '100%';
    height: '100%';
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
`

const LoadingTip = () => <LoadingBox><Spin /></LoadingBox>

const routerList = [
  {
    path: '/list',
    privite: true,
    component: loadable({
      loader: () => import('pages/list'),
      loading: LoadingTip
    })
  },
  {
    path: '/login',
    privite: false,
    component: loadable({
      loader: () => import('pages/login'),
      loading: LoadingTip
    })
  },
  {
    path: '/kanban',
    privite: true,
    component: loadable({
      loader: () => import('pages/kanban'),
      loading: LoadingTip
    })
  }
]

function App() {

  return (
    <Router>
      <Routes>
        {
          routerList.map((item, i) => (
            <Route key={i} path={item.path}
              element={
                item.privite ? <item.component /> : (
                  <Privite>
                    <item.component />
                  </Privite>
                )
              }
            />
          ))
        }
        <Route path={'*'} element={<Navigate to={'list'} />} />
      </Routes>
    </Router>
  )
}

export default App
