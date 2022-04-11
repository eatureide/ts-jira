import { DragDropContext, Droppable, Draggable, DropResult, ResponderProvided, DragUpdate, DragStart } from 'react-beautiful-dnd'
import styled from '@emotion/styled'

const Container = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    background-color: ${({ isDragging }: { isDragging: boolean }) => isDragging ? '#E3FCEF' : '#EBECF0'};
    transition: background-color 0.2s ease;

    &:hover {
        background-color: '#E3FCEF';
    }
`

const List = () =>{
    
}

export interface ColumnProps {
    index: number
    title: string
}

export const Column = (props: ColumnProps) => {
    const { title, index } = props

    return (
        <Draggable draggableId={title} index={index}>
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Header
                        isDragging={snapshot.isDragging}
                        {...provided.dragHandleProps}
                        aria-label={`${title} quote list`}
                    >
                        {title}
                    </Header>
                </Container>
            )}
        </Draggable>

    )
}