import { useState } from 'react'
import { DragDropContext, DropResult, } from 'react-beautiful-dnd'
import { columnsFormBacked } from './data'
import { DroppableContainer } from './components'


export const Index = () => {

    const [columns, setColumns] = useState(columnsFormBacked)

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return
        const { source, destination } = result
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