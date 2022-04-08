import { useUser } from 'models/user'
import { Dropdown, Menu, Typography } from 'antd'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import * as Styles from './style'
import { handleUserRemove } from 'utils/user'
import { SearchPannel } from './search-pannel'
import { Projects } from './projects'

export const List = () => {

    const { user, cleanUser } = useUser()
    const handleLogout = () => {
        handleUserRemove()
        cleanUser()
    }

    return (
        <Styles.Container>
            <Styles.Header>
                <SoftwareLogo />
                <div>项目</div>
                <div>组员</div>
                <Dropdown overlay={
                    <Menu>
                        <Menu.Item key={`logout`} onClick={handleLogout}>登出</Menu.Item>
                    </Menu>
                }>
                    <Styles.UserName>{user.name}</Styles.UserName>
                </Dropdown>
            </Styles.Header>
            <Styles.Main>
                <Typography.Title level={2}>项目列表</Typography.Title>
                <SearchPannel />
                <Projects style={{ marginTop: '2em' }} />
            </Styles.Main>
        </Styles.Container>
    )
}