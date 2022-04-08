import { http } from 'utils/http'
import { Member } from 'components/user-select'

export const projectList = (data: Partial<Member>) => {
    return http({
        method: 'GET',
        path: '/projects',
        data
    })
}