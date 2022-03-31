import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
import { useCallback } from 'react'
const apiUrl = process.env.REACT_APP_API_URL


interface Config extends RequestInit {
    token?: string
    data?: object
}
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {

    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint = `${endpoint}?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }
    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重登录' })
            }
            const data = await response.json()
            if (response.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttp = () => {
    const { user } = useAuth()
    // 讲解 Parameters操作符
    // utily type的用法，用泛型传入一个其他类型，然后utily type对这个类型进行某种操作
    return useCallback((...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token }), [user?.token])
}

type a = string | number
let b: a = '1'

type person = {
    name: string,
    age: number
}
// 选传
const test: Partial<person> = { age: 8 }
// 部分必传
const shenmi: Omit<person, 'name' | 'age'> = { age: 8 }

// 选择该类型的某些键位成为新类型
type persononlyname = Pick<person, 'name'>

// 去掉该类型的键值
type age = Exclude<person, 'name'>
type Partial<T> = {
    // 键p遍历泛型t，让t所有的键值改为可选
    [P in keyof T]?: T[P];
}