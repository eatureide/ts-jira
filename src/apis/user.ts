import { http } from 'utils/http'
import { handleUserReponse } from 'utils/user'

export const register = (data: { username: string, password: string }) => {
    return http({
        method: 'POST',
        path: '/register',
        data
    }).then(async (response) => {
        if (response.user) {
            handleUserReponse(response)
            return response
        }
        Promise.reject(response)
    })
}

export const login = (data: { username: string, password: string }) => {
    return http({
        method: 'POST',
        path: '/login',
        data
    }).then(async (response) => {
        if (response.user) {
            handleUserReponse(response)
            return response
        }
        Promise.reject(response)
    })
}

export const me = (data: { token: string }) => {
    return http({
        method: 'GET',
        path: '/me',
        data
    })
}

export const users = () => {
    return http({
        method: 'GET',
        path: '/users'
    })
}
