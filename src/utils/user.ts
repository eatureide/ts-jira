export interface User {
    id: number
    name: string
    email: string
    title: string
    organization: string
    token: string
}

const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserReponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

export const handleUserRemove = () => {
    localStorage.removeItem(localStorageKey)
}