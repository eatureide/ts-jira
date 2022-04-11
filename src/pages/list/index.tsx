import { Typography } from 'antd'
import * as Styles from './style'
import { SearchPannel } from './search-pannel'
import { Projects } from './projects'
import { PageHeader } from 'components/header'
import { ProjectModal } from 'components/project-modal'

export const List = () => {

    return (
        <Styles.Container>
            <PageHeader />
            <Styles.Main>
                <Typography.Title level={2}>项目列表</Typography.Title>
                <SearchPannel />
                <Projects style={{ marginTop: '2em' }} />
                <ProjectModal />
            </Styles.Main>
        </Styles.Container>
    )
}