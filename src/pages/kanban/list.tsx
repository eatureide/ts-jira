import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DragUpdate, DragStart } from 'react-beautiful-dnd'
import styled from '@emotion/styled'

export const getBackgroundColor = (
    isDraggingOver: boolean,
    isDraggingFrom: boolean,
): string => {
    if (isDraggingOver) {
        return '#FFEBE6';
    }
    if (isDraggingFrom) {
        return '#E6FCFF';
    }
    return '#EBECF0'
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`


interface ListProps {
    listType: string
    tasks: any
    draggableId: string
    [key: string]: any
}

export const List = (props: ListProps) => {

    const { listType, tasks, draggableId } = props

    return (
        <Droppable
            droppableId={draggableId}
            type={listType}
        >
            {(dropProvided) => (
                <Wrapper {...dropProvided.droppableProps}>
                    <div
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                    >
                        {
                            tasks.map((item: any, index: number) => (
                                <Draggable key={item.id} draggableId={`task-${item.id}`} index={index}>
                                    {
                                        (provided, snapshot) => (
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
                                                    ...provided.draggableProps.style,
                                                }}
                                            >{item.name}</div>
                                        )
                                    }
                                </Draggable>
                            ))
                        }
                        {dropProvided.placeholder}
                    </div>
                </Wrapper>
            )}
        </Droppable>
    )
}