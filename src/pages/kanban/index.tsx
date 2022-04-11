import { PageContainer, Main } from 'components/container'
import { kanbans, allTasks } from 'apis/kanban'
import { useCallback, useEffect, useState } from 'react'
import { useSetUrlSearchParam } from 'utils/common'
import { Board } from './board'
import { columnsType } from './data-type'
import { DropResult } from 'react-beautiful-dnd'
import lodash from 'lodash'

export const Kanban = () => {

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

        // if (result.type === 'COLUMN') {
        //     const sourceIndex = source.index
        //     const destinationIndex = destination.index
        //     const copiedKanban = [...kanban]
        //     const [remove] = copiedKanban.splice(sourceIndex, 1)
        //     copiedKanban.splice(destinationIndex, 0, remove)
        //     setKanban(copiedKanban)
        //     return
        // }


        // if (result.type === 'QUOTE' && (source.droppableId !== destination.droppableId)) {
        //     const sourceIndex = source.index
        //     const destinationIndex = destination.index
        //     const [destinationColumnIndex] = destination.droppableId.split('-').slice(-1)
        //     const copiedKanban = [...kanban]
        //     const [remove]: any = copiedKanban[sourceIndex]?.tasks?.splice(sourceIndex, 1)
        //     copiedKanban[Number(destinationColumnIndex)]?.tasks?.splice(destinationIndex, 0, remove)
        //     setKanban(copiedKanban)
        //     return
        // }

        if (result.type === 'QUOTE' && (source.droppableId === destination.droppableId)) {
            const sourceIndex = source.index
            const destinationIndex = destination.index
            const copiedKanban = [...kanban]
            const [remove]: any = copiedKanban[sourceIndex]?.tasks?.splice(sourceIndex, 1)
            copiedKanban[sourceIndex]?.tasks?.splice(destinationIndex, 0, remove)
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