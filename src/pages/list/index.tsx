import { Typography } from 'antd'
import { SearchPannel } from './search-pannel'
import { Projects } from './projects'
import { ProjectModal } from 'components/project-modal'
import { PageContainer, Main } from 'components/container'

const List = () => {

    return (
        <PageContainer>
            <Main>
                <Typography.Title level={2}>项目列表</Typography.Title>
                <SearchPannel />
                <Projects style={{ marginTop: '2em' }} />
                <ProjectModal />
            </Main>
        </PageContainer>
    )
}

export default List