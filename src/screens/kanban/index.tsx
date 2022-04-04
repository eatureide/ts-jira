import { useDcoumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban-colum'
import { useProjectInInUrl, useKanbanSearchParams, useTaskSearchParams } from './util'
import styled from '@emotion/styled'
import { SearchPannel } from 'screens/kanban/search-pannel'
import { useTasks } from 'utils/task'
import { Spin } from 'antd'
import { CreateKanban } from './create-kanban'


export const KanbanScreen = () => {
    useDcoumentTitle('看板列表')
    const { data: currentProject } = useProjectInInUrl()
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
    const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams())
    const isLoading = taskIsLoading || kanbanIsLoading
    return (
        <>
            <h1>{currentProject?.name}看板</h1>
            <SearchPannel />
            <ColumnsContainer>
                {
                    isLoading ? <Spin size={'large'} /> : (
                        <>
                            {
                                kanbans?.map((kanban) => (
                                    <KanbanColumn key={kanban.id} kanban={kanban} />
                                ))
                            }
                            <CreateKanban />
                        </>
                    )
                }
            </ColumnsContainer>
        </>
    )
}

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`