import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DragUpdate, DragStart } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import { Card } from 'antd'


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
  padding: 8px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 268px;
  height: 100%;
  background: #EBECF0;
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
                                        (provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    ...provided.draggableProps.style,
                                                    userSelect: 'none',
                                                    padding: 16,
                                                    margin: '0 0 8px 0',
                                                    minHeight: 80,
                                                    background: '#fff'
                                                }}
                                            >
                                                {item.name}
                                            </div>
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