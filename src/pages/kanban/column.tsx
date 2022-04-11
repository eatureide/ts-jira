import { Draggable } from 'react-beautiful-dnd'
import styled from '@emotion/styled'
import { List } from './list'

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

const Container = styled.div`
  margin: 8px;
  display: flex;
  flex-direction: column;

`

const Title = styled.h4`
  padding: 8px;
  transition: background-color ease 0.2s;
  flex-grow: 1;
  user-select: none;
  position: relative;

  &:focus {
    outline: 2px solid #998DD9;
    outline-offset: 2px;
  }
`

interface ColumnProps {
    title: string
    index: number
    tasks: any
    draggableId: string
}

export const Column = (props: ColumnProps) => {
    const { title, index, tasks, draggableId } = props

    return (
        <div style={{ marginRight: '8px' }}>
            <Draggable draggableId={draggableId} index={index}>
                {(provided, snapshot) => (
                    <Container ref={provided.innerRef} {...provided.draggableProps}>
                        <Header isDragging={snapshot.isDragging}>
                            <Title {...provided.dragHandleProps}>{title}</Title>
                        </Header>
                        <List
                            draggableId={draggableId}
                            listId={draggableId}
                            listType={`QUOTE`}
                            tasks={tasks}
                        />
                    </Container>
                )}
            </Draggable>
        </div>

    )
}