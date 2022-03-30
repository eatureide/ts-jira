import { useMemo } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { cleanObject } from 'utils'

export const useUrlQueryParm = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParm] = useSearchParams()
    return [
        useMemo(
            () => (
                keys.reduce((prev: {}, key: string) => {
                    return {
                        ...prev,
                        [key]: searchParams.get(key) || ''
                    }
                }, {}) as { [key in K]: string }
            ),
            [searchParams]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            // iterator
            const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
            return setSearchParm(o)
        }
    ] as const
}