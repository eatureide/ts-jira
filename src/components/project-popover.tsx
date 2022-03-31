import styled from '@emotion/styled'
import { Popover, Typography, List, Divider, Button } from 'antd'
import { useProjects } from 'screens/project-list/project'
import { ButtonNoPadding } from 'components/lib'

export const ProjectPopover = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
    const { data: projectes, isLoading } = useProjects()
    const pinnedProjects = projectes?.filter((project) => project.pin)
    const content = (
        <ContenetContainer>
            <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
            <List>
                {
                    pinnedProjects?.map((project) => (
                        <List.Item key={project.id}>
                            <List.Item.Meta title={project.name} />
                        </List.Item>
                    ))
                }
            </List>
            <Divider />
            <ButtonNoPadding type={'link'} onClick={() => props.setProjectModalOpen(true)}>创建项目</ButtonNoPadding>
        </ContenetContainer>

    )
    return (
        <Popover placement={'bottom'} content={content}>
            <span>项目</span>
        </Popover>
    )
}

const ContenetContainer = styled.div`
    min-width: 30rem;
`