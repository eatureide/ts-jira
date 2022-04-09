import qs from 'qs'
import { getToken } from 'utils/user'
import { cleanObject } from './common'

const REACT_APP_API_URL = `http://localhost:3001`
const apiUrl = REACT_APP_API_URL

interface RequestConfig extends RequestInit {
    path: string,
    data?: object
}

export const http = async (params: RequestConfig) => {
    let { path, data, ...customConfig } = params
    data = data ? cleanObject(data) : data
    const token = getToken()
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        path = `${path}?${qs.stringify(data)}`
    }

    if (config.method.toUpperCase() === 'POST') {
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiUrl}${path}`, config).then(async (response) => {
        const data = await response.json()
        if (response.ok) {
            return data
        }
        return Promise.reject(data)
    })
}