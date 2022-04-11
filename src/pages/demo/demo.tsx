import { useState, useEffect, useCallback } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DragUpdate, DragStart } from 'react-beautiful-dnd'
import { v4 as uuid } from 'uuid';

const itemFormBacked = [
    {
        id: uuid(),
        content: 'first task'
    },
    {
        id: uuid(),
        content: 'secound task'
    }
]

const columnsFormBacked = {
    [uuid()]: {
        name: 'Todo',
        items: itemFormBacked
    },
    [uuid()]: {
        name: 'im progress',
        items: []
    },
    [uuid()]: {
        name: 'done',
        items: [],
    }
}

const onDragEnd = (result: DropResult, columns: { [key: string]: any }, setColumns: (data: any) => void) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
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
    } else {
        const column = columns[source.droppableId]
        const copiedItems = [...column.items]
        const [remove] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, remove)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
    }

}

export const Index = () => {

    const [columns, setColumns] = useState(columnsFormBacked)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <DragDropContext
                onDragEnd={(result: DropResult) => onDragEnd(result, columns, setColumns)}
            >
                {
                    Object.entries(columns).map(([id, column]) => {
                        return (
                            <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div>{column.name}</div>
                                <div style={{ marginRight: 8 }}>
                                    <Droppable droppableId={id}>
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
                                                                return (
                                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                        {
                                                                            (provided, snapshot) => {
                                                                                return (
                                                                                    <div
                                                                                        ref={provided.innerRef}
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
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
                    })
                }
            </DragDropContext>
        </div>
    )
}