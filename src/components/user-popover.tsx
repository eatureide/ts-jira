import styled from '@emotion/styled'
import { Popover, Typography, List, Divider, Button } from 'antd'
import { useProjects } from 'screens/project-list/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal } from 'utils/url'
import { useUsers } from 'screens/project-list/user'

export const UserPopover = () => {
    const { data: users, refetch } = useUsers()

    const content = (
        <ContenetContainer>
            <Typography.Text type={'secondary'}>组员列表</Typography.Text>
            <List>
                {
                    users?.map((user) => (
                        <List.Item key={user.id}>
                            <List.Item.Meta title={user.name} />
                        </List.Item>
                    ))
                }
            </List>
            <Divider />
        </ContenetContainer>

    )
    return (
        <Popover placement={'bottom'} content={content} onVisibleChange={() => refetch()}>
            <span>组员</span>
        </Popover>
    )
}

const ContenetContainer = styled.div`
    min-width: 30rem;
`