import { Button } from 'antd'
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row, ButtonNoPadding } from 'components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Dropdown, Menu } from 'antd'
import { Navigate, Routes, Route } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'
import { useState } from 'react'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'

/**
 * grid和flex各自的应用场景
 * 1、要考虑是一维布局还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2、是从内容出发还是布局出发
 * 从内容出发，你先有一组内容（数量一般不固定），然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发，先规划网格（数量一般固定）然后再把内容往里填充
 * 从布局出发，用flex
 * 从内容出发，用grid
 */

export const AuthticatedApp = () => {

    return (
        <Router>
            <Container>
                <PageHeader />
                <Main>

                    <Routes>
                        <Route path={'/projects'} element={<ProjectListScreen />} />
                        <Route path={'/projects/:projectId/*'} element={<ProjectScreen />} />
                        <Route path={'*'} element={<Navigate to={'projects'} />} />
                    </Routes>

                </Main>
                <ProjectModal />
            </Container>
        </Router>
    )
}

const PageHeader = () => {
    const { logout, user } = useAuth()
    return (
        <Header between={true}>
            <HeaderLeft gap={true}>
                <ButtonNoPadding type={'link'} onClick={resetRoute}>
                    <SoftwareLogo color="rgb(38, 132, 255)" />
                </ButtonNoPadding>
                <ProjectPopover />
                <span>用户</span>
            </HeaderLeft>
            <HeaderRight>
                <User />
            </HeaderRight>
        </Header>
    )
}

const User = () => {
    const { logout, user } = useAuth()
    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item key={'logout'}>
                    <Button type="link" onClick={logout}>登出</Button>

                </Menu.Item>
            </Menu>
        }>
            <Button type="link" onClick={logout}>  hi,{user?.name}</Button>
        </Dropdown>
    )
}

// template dead zone (暂时性死区)
const HeaderItem = styled.h3`
    margin-right: 3rem;
`

const Header = styled(Row)`
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
    padding:3rem;
    svg{
        width: auto;
        height: 100%;
    }
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``

const Main = styled.main`
    height: calc(100vh - 6rem);
`

const Container = styled.div`
    display:grid;
    grid-template-rows: 6rem 1fr 6rem;
    height: 100vh;
`