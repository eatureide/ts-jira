import { User } from 'types/user'
// 在真实环境中，如果使用direbase这种第三方auth服务的话，本文将不需要开发

const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL
export const getToken = () => window.localStorage.getItem(localStorageKey)
export const handleUserReponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const login = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async reponse => {
        if (reponse.ok) {
            return handleUserReponse(await reponse.json())
        } else {
            return Promise.reject(await reponse.json())
        }
    })
}

export const register = (data: { username: string, password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(async reponse => {
        if (reponse.ok) {
            return handleUserReponse(await reponse.json())
        } else {
            return Promise.reject(await reponse.json())
        }
    })
}

export const logout = async () => {
    await window.localStorage.removeItem(localStorageKey)
}