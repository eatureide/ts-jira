import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DragUpdate, DragStart } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import { useState } from 'react'
import { colums as initialColumns, ordered as initialOrdered } from './data'
import { Column } from './column'

const Container = styled.div`
  background-color: #4C9AFF;
  min-height: 100vh;
  min-width: 100vw;
  display: inline-flex;
`

export const Board = () => {

    const [columns, setColumns] = useState(initialColumns)
    const [ordered, setOrdered] = useState(initialOrdered)

    const handleDragEnd = (result: DropResult) => {

    }

    const board = (
        <Droppable
            droppableId={`board`}
            type={`COLUMN`}
            direction={`horizontal`}
            ignoreContainerClipping={false}
            isCombineEnabled={false}
            
        >
            {
                (provided) => (
                    <Container
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {ordered.map((key: string, index: number) => (
                            <Column
                                key={index}
                                index={index}
                                title={key}
                            />
                        ))}
                    </Container>
                )
            }

        </Droppable>
    )

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            {board}
        </DragDropContext>
    )
} 