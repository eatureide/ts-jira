import { Button } from 'antd'
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/auth-context'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { ReactComponent as SoftwareLogo } from 'assets/logo.svg'
import { Dropdown, Menu } from 'antd'

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
    const { logout, user } = useAuth()
    return (
        <Container>
            <Header between={true}>
                <HeaderLeft gap={true}>
                    <SoftwareLogo height={'50px'} width={'50px'} color={'rgb(38,122,255)'} />
                    <h3>项目</h3>
                    <h3>用户</h3>
                </HeaderLeft>
                <HeaderRight>
                    <Dropdown overlay={
                        <Menu>
                            <Menu.Item key={'logout'}>
                                <Button type="link" onClick={logout}>登出</Button>

                            </Menu.Item>
                        </Menu>
                    }>
                        <Button type="link" onClick={logout}>  hi,{user?.name}</Button>
                    </Dropdown>
                </HeaderRight>
            </Header>
            <Main>
                <ProjectListScreen />
            </Main>
        </Container>
    )
}

const HeaderItem = styled.h3`
    margin-right: 3rem;
`

const Header = styled(Row)`
    padding:3.2rem;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.1);
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