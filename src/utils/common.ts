import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'

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

export const useSetUrlSearchParam = (keys: string[]) => {

    const [searchParams, setSearchParm] = useSearchParams()
    const res = keys.reduce((prev, key) => ({
        ...prev,
        [key]: searchParams.get(key) || ''
    }), {})

    useEffect(() => {
        setSearchParm(res)
    }, [])

    return {
        paramsValue: res,
        searchParams,
        setSearchParm
    }
}