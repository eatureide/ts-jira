import { Droppable, Draggable } from 'react-beautiful-dnd'
import { TaskType } from './data'

interface DroppableContainerProps {
    droppableId: string
    column: {
        name: string
        items: TaskType[]
    }
}
export const DroppableContainer = (props: DroppableContainerProps) => {

    const { droppableId, column } = props

    return (
        <div
            key={droppableId}
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
            <div>{column.name}</div>
            <div style={{ marginRight: 8 }}>
                <Droppable droppableId={droppableId}>
                    {
                        (provided, snapshot) => {
                            return (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                        padding: 4,
                                        width: 250,
                                        minHeight: 500
                                    }}
                                >
                                    {
                                        column.items.map((item: any, index: number) => {
                                            return <DraggableContainer key={index} column={item} index={index} />
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    }
                </Droppable>
            </div>
        </div>
    )
}

interface DraggableProps {
    index: number
    column: TaskType
}
export const DraggableContainer = (props: DraggableProps) => {
    const { column: item, index } = props

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {
                (provided, snapshot) => {
                    return (
                        <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            style={{
                                userSelect: 'none',
                                padding: 16,
                                margin: '0 0 8px 0',
                                minHeight: '50px',
                                background: snapshot.isDragging ? '#263b4a' : '#456c86',
                                color: 'white',
                                ...provided.draggableProps.style
                            }}
                        >
                            {item.content}
                        </div>
                    )
                }
            }
        </Draggable>
    )
}