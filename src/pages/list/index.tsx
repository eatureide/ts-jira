import { Typography } from 'antd'
import { SearchPannel } from './search-pannel'
import { Projects } from './projects'
import { ProjectModal } from 'components/project-modal'
import { PageContainer, Main } from 'components/container'

let openRequest = indexedDB.open('js-cache', 1)
openRequest.onsuccess = function () {
    let db = openRequest.result
  
    console.log(db)
    // 继续使用 db 对象处理数据库
}


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