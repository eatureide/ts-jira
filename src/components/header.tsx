import styled from '@emotion/styled'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Dropdown, Menu } from 'antd'
import { useUser } from 'models/user'
import { handleUserRemove } from 'utils/user'

export const PageHeader = () => {

    const { user, cleanUser } = useUser()
    const handleLogout = () => {
        handleUserRemove()
        cleanUser()
    }

    return (
        <Header>
            <SoftwareLogo />
            <div>项目</div>
            <div>组员</div>
            <Dropdown overlay={
                <Menu>
                    <Menu.Item key={`logout`} onClick={handleLogout}>登出</Menu.Item>
                </Menu>
            }>
                <UserName>{user.name}</UserName>
            </Dropdown>
        </Header>
    )
}

export const UserName = styled.div`
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right: 2em;
`

export const Header = styled.div`
    box-shadow: 0 0 8px rgba(0,0,0,0.07);
    display: flex;
    align-items: center;
    position: relative;
    svg{
        height: 45%;
        margin-left: 2em;
    }
    div{
        font-size: 20px;
        margin-left: 2em;
        cursor: pointer;
    }
`