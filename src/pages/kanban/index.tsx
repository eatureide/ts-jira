import { PageContainer } from 'components/container'
import { kanbans, allTasks } from 'apis/kanban'
import { useEffect, useState } from 'react'
import { useSetUrlSearchParam } from 'utils/common'
import { Board } from './board'
import { columnsType } from './data-type'
import { DropResult } from 'react-beautiful-dnd'
import lodash from 'lodash'
import styled from '@emotion/styled'

export const Main = styled.div`
    padding: 2em;
    display: flex;
    align-items: stretch;
`

const Kanban = () => {

    const { paramsValue: { projectId } } = useSetUrlSearchParam(['projectId'])
    const [kanban, setKanban] = useState<columnsType[]>([])

    const handleKanbans = async () => {
        const kanbanRes = await kanbans({ projectId })
        const taskRes = await allTasks()
        kanbanRes.forEach((item: any) => {
            item.tasks = taskRes.filter((task: any) => task.kanbanId === item.id)
        })
        setKanban(kanbanRes)
    }

    const handleDragResult = (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return

        if (result.type === 'COLUMN') {
            const sourceIndex = source.index
            const destinationIndex = destination.index
            const copiedKanban = lodash.cloneDeep([...kanban])
            const [remove] = copiedKanban.splice(sourceIndex, 1)
            copiedKanban.splice(destinationIndex, 0, remove)
            setKanban(copiedKanban)
            return
        }

        if (result.type === 'QUOTE' && (source.droppableId !== destination.droppableId)) {
            const sourceIndex = source.index
            const destinationIndex = destination.index
            const [destinationColumnIndex] = destination.droppableId.split('-').slice(-1)
            const [souceColumnIndex] = source.droppableId.split('-').slice(-1)
            const numberDestinationColumnIndex = Number(destinationColumnIndex)
            const numberSouceColumnIndex = Number(souceColumnIndex)
            const copiedKanban = lodash.cloneDeep([...kanban])
            const [remove]: any = copiedKanban[numberSouceColumnIndex]?.tasks?.splice(sourceIndex, 1)
            copiedKanban[numberDestinationColumnIndex]?.tasks?.splice(destinationIndex, 0, remove)
            setKanban(copiedKanban)
            return
        }

        if (result.type === 'QUOTE' && (source.droppableId === destination.droppableId)) {
            const [destinationColumnIndex] = destination.droppableId.split('-').slice(-1)
            const numberDestinationColumnIndex = Number(destinationColumnIndex)
            const sourceIndex = source.index
            const destinationIndex = destination.index
            const copiedKanban = lodash.cloneDeep([...kanban])
            const [remove]: any = copiedKanban[numberDestinationColumnIndex]?.tasks?.splice(sourceIndex, 1)
            copiedKanban[numberDestinationColumnIndex]?.tasks?.splice(destinationIndex, 0, remove)
            setKanban(copiedKanban)
            return
        }
    }

    useEffect(() => {
        handleKanbans()
    }, [projectId])

    return (
        <PageContainer>
            <Main>
                <Board columns={kanban} columnsDragEnd={handleDragResult} />
            </Main>
        </PageContainer>
    )
}

export default Kanban