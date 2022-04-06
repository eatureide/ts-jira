import { useDcoumentTitle } from 'utils'
import { useKanbans, useReorderKanban } from 'utils/kanban'
import { KanbanColumn } from './kanban-colum'
import { useProjectInInUrl, useKanbanSearchParams, useTaskSearchParams, useTasksQueryKey, useKanbanQueryKey } from './util'
import styled from '@emotion/styled'
import { SearchPannel } from 'screens/kanban/search-pannel'
import { useReorderTask, useTasks } from 'utils/task'
import { Spin } from 'antd'
import { CreateKanban } from './create-kanban'
import { TaskModal } from './task-modal'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Drag, Drop, DropChild } from 'components/drag-and-drop'
import { useCallback } from 'react'


export const KanbanScreen = () => {
    useDcoumentTitle('看板列表')
    const { data: currentProject } = useProjectInInUrl()
    const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams())
    const { isLoading: taskIsLoading } = useTasks(useTaskSearchParams())
    const isLoading = taskIsLoading || kanbanIsLoading
    const onDragEnd = useDragEnd()
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <h1>{currentProject?.name}看板</h1>
            <SearchPannel />
            {isLoading && <Spin size={'large'} />}
            <ColumnsContainer>
                <Drop type={'COLUMN'} direction={'horizontal'} droppableId={'kanban'}>
                    <DropChild style={{ display: 'flex' }}>
                        {kanbans?.map((kanban, index) => (
                            <Drag
                                key={kanban.id}
                                draggableId={"kanban" + kanban.id}
                                index={index}
                            >
                                <KanbanColumn kanban={kanban} key={kanban.id} />
                            </Drag>
                        ))}

                    </DropChild>
                </Drop>
                <CreateKanban />
            </ColumnsContainer>
            <TaskModal />
        </DragDropContext>
    )
}

export const useDragEnd = () => {
    const { data: kanbans } = useKanbans(useKanbanSearchParams())
    const { mutate: reorderKanban } = useReorderKanban(useKanbanQueryKey())
    const { mutate: reorderTasks } = useReorderTask(useTasksQueryKey())
    const { data: allTasks = [] } = useTasks(useTaskSearchParams())
    return useCallback(({ source, destination, type }: DropResult) => {
        console.log(type)
        if (!destination) return
        // 看板排序
        if (type === 'COLUMN') {
            const fromId = kanbans?.[source.index].id
            const toId = kanbans?.[destination.index].id
            if (!fromId || !toId || fromId === toId) return
            const type = destination.index > source.index ? 'after' : 'before'
            reorderKanban({ fromId, referenceId: toId, type })
        }
        if (type === 'ROW') {
            const fromKanbanId = +source.droppableId;
            const toKanbanId = +destination.droppableId;
            const fromTask = allTasks.filter(
                (task) => task.kanbanId === fromKanbanId
            )[source.index];
            const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
                destination.index
            ];
            if (fromTask?.id === toTask?.id) {
                return;
            }
            reorderTasks({
                fromId: fromTask?.id,
                referenceId: toTask?.id,
                fromKanbanId,
                toKanbanId,
                type:
                    fromKanbanId === toKanbanId && destination.index > source.index
                        ? "after"
                        : "before",
            });
        }
    }, [kanbans, reorderKanban, allTasks, reorderTasks])
}

export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`