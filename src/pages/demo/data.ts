import { v4 as uuid } from 'uuid'

export interface TaskType {
    id: string,
    content: string
}
// 任务
export const itemFormBacked: TaskType[] = [
    {
        id: uuid(),
        content: 'first task'
    },
    {
        id: uuid(),
        content: 'secound task'
    }
]

export interface TableProps {
    [key: string]: {
        name: string
        items: TaskType[]
    }
}
// 任务组
export const columnsFormBacked: TableProps = {
    [uuid()]: {
        name: 'Todo',
        items: itemFormBacked
    },
    [uuid()]: {
        name: 'done',
        items: [],
    }
}