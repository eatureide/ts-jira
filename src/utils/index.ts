import { useEffect, useState } from 'react'

export const isVioid = (value: unknown) => value === undefined || value === null || value === ''
export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object }
    Object.keys(result).forEach((key) => {
        const value = object[key]
        if (isVioid(value)) {
            delete result[key]
        }
    })
    return result
}

export const useMount = (callBack: () => void) => {
    useEffect(() => {
        callBack()
        // todo 依赖项里加上callback会造成无限循环，这个和useCallback以及useMemo有关系
    }, [])
}

// 后面用泛型规范类型
export const useDebounse = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounseValue] = useState(value)
    // 每次在value变化后设置一个定时器
    useEffect(() => {
        const timeout = setTimeout(() => setDebounseValue(value), delay)
        // 先清理上一次effect，再执行effect体
        return () => {
            clearTimeout(timeout)
        }
    }, [value, delay])

    return debounceValue
}

export const useArray = <T>(initialArray: T[]) => {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex: (index: number) => {
            const copy = [...value]
            copy.slice(index, 1)
            setValue(copy)
        }
    }
}