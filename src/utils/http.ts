import qs from 'qs'
import { getToken } from 'utils/user'
import { cleanObject } from './common'

const apiUrl = process.env.REACT_APP_API_URL

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
    const isGET = config.method.toUpperCase() === 'GET'

    if (isGET) {
        path = `${path}?${qs.stringify(data)}`
    }

    if (!isGET) {
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