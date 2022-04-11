import { columnsType } from './data-type'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { Column } from './column'
import styled from '@emotion/styled'

interface DragColumnProps {
    columns: columnsType[]
    columnsDragEnd: (result: DropResult) => void
}

const Container = styled.div`
  display: flex;
  align-items: stretch;
`

export const Board = ({ columns, columnsDragEnd }: DragColumnProps) => {

    const onDragEnd = (result: DropResult) => {
        columnsDragEnd(result)
    }

    return (
        <DragDropContext onDragEnd={(result: DropResult) => onDragEnd(result)}>
            <Droppable
                type={'COLUMN'}
                direction={'horizontal'}
                droppableId={'kanban'}
            >
                {(provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {columns.map((item, index) => (
                            <Column
                                key={item.id}
                                index={index}
                                title={item.name}
                                draggableId={`column-${item.id}-${index}`}
                                tasks={item.tasks}
                            />
                        ))}
                        {provided.placeholder}
                    </Container>
                )}
            </Droppable>
        </DragDropContext>
    )
}