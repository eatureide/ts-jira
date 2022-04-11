export interface rowsType {
    id: number
    name: string
    ownerId: number
    projectId: number
    [key: string]: any
}

export interface columnsType {
    id: string
    name: string
    tasks?: rowsType[]
}