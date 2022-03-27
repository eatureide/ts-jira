import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object: object) => {
    const result = { ...object }
    Object.keys(result).forEach((key) => {
        // @ts-ignore
        const value = object[key]
        if (isFalsy(value)) {
            // @ts-ignore
            delete result[key]
        }
    })
    return result
}

export const useMount = (callBack: () => void) => {
    useEffect(() => {
        callBack()
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