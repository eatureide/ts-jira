import { http } from 'utils/http'

export const kanbans = (data: { projectId: string }) => {
    return http({
        method: 'GET',
        path: '/kanbans',
        data
    })
}

export const allTasks = () => {
    return http({
        method: 'GET',
        path: '/tasks'
    })
}