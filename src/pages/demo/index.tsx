import { useState } from 'react'
import { DragDropContext, DropResult, } from 'react-beautiful-dnd'
import { columnsFormBacked } from './data'
import { DroppableContainer } from './components'


export const Index = () => {

    const [columns, setColumns] = useState(columnsFormBacked)

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const { source, destination } = result
        const isDragColum = source.droppableId !== destination.droppableId

        const dragColum = () => {
            // 获取拖拽的起始列
            const sourceColumn = columns[source.droppableId]
            // 获取目标的列
            const destColumn = columns[destination.droppableId]
            // 获取拖拽起始列的任务
            const sourceItems = [...sourceColumn.items]
            // 获取目标列的任务
            const destItems = [...destColumn.items]
            // 获取移除的那个任务
            const [removed] = sourceItems.splice(source.index, 1)
            // 将移除的那个任务加入到目标列的任务中
            destItems.splice(destination.index, 0, removed)
            // 更新
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            })
        }

        const dragRow = () => {
            // 获取操作的那一列
            const column = columns[source.droppableId]
            // 复制那一列的items
            const copiedItems = [...column.items]
            // 删除操作的那个元素(也就是拖拽前的那个index元素)并获取
            const [remove] = copiedItems.splice(source.index, 1)
            // 将这个元素加入到目标元素的那个index
            copiedItems.splice(destination.index, 0, remove)

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            })
        }

        if (isDragColum) {
            dragColum()
        }
        if (!isDragColum) {
            dragRow()
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
                {
                    Object.entries(columns).map(([id, column]) => (
                        <DroppableContainer
                            droppableId={id}
                            column={column}
                            key={id}
                        />
                    ))
                }
            </DragDropContext>
        </div>
    )
}