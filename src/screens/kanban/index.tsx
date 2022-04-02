import { useDcoumentTitle } from 'utils'
import { useKanbans } from 'utils/kanban'
import { KanbanColumn } from './kanban-colum'
import { useProjectInInUrl, useKanbanSearchParams } from './util'
import styled from '@emotion/styled'

export const KanbanScreen = () => {
    useDcoumentTitle('看板列表')
    const { data: currentProject } = useProjectInInUrl()
    const { data: kanbans } = useKanbans(useKanbanSearchParams())

    return (
        <ColumnsContainer>
            <h1>{currentProject?.name}看板</h1>
            {
                kanbans?.map((kanban) => (
                    <KanbanColumn key={kanban.id} kanban={kanban} />
                ))
            }
        </ColumnsContainer>
    )
}

const ColumnsContainer = styled.div`
    display: flex;
    overflow: hidden;
    margin-right: 2rem;
`