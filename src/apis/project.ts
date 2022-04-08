import { http } from 'utils/http'

export const projectList = (data: { name: string, personId: string }) => {
    return http({
        method: 'GET',
        path: '/projects',
        data
    })
}