import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const isVioid = (value: unknown) => value === undefined || value === null || value === ''

export const cleanObject = (obj: { [key: string]: any }) => {
    const result = { ...obj }
    Object.keys(result).forEach((key) => {
        const value = result[key]
        if (isVioid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useDebounse = <V>(value: V, delay = 300) => {
    const [debounceValue, setDebounseValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebounseValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value])

    return debounceValue
}

export const useSetUrlSearchParam = <K extends string>(keys: K[]) => {

    const [searchParams, setSearchParm] = useSearchParams()
    const initial = {} as { [key in K]: string }
    const res = keys.reduce((prev, key) => ({
        ...prev,
        [key]: searchParams.get(key) || ''
    }), initial)

    useEffect(() => {
        setSearchParm(cleanObject(res))
    }, [])

    return {
        paramsValue: res,
        searchParams,
        setSearchParm
    }
}