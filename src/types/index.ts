export type Row = string | number | undefined

export interface Project {
    key: string
    id: number
    name: string
    personId: number
    pin: boolean
    organization: string
    created: number
}