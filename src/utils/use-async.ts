import { useCallback, useState, useReducer } from 'react'
import { useMountedRef } from 'utils'

interface State<D> {
    error: Error | null
    data: D | null
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defualtConfig = {
    throwOnError: false
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef()

    return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [dispatch, mountedRef])
}

export const useAsync = <D>(
    initialState?: State<D>,
    initialConfig?: typeof defualtConfig
) => {

    const config = { ...defualtConfig, ...initialConfig }
    const [state, dispatch] = useReducer((state: State<D>,
        action: Partial<State<D>>) => ({ ...state, ...action }), {
        ...defaultInitialState,
        ...initialState
    })
    const safeDispatch = useSafeDispatch(dispatch)
    const [retry, setRetry] = useState(() => () => { })

    const setData = useCallback((data: D) => {
        safeDispatch({
            data,
            stat: 'success',
            error: null
        })
    }, [safeDispatch])

    const setError = useCallback((error: Error) => {
        safeDispatch({
            error,
            stat: 'error',
            data: null
        })
    }, [safeDispatch])

    // 用来触发异步请求
    const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入promise类型数据')
        }
        safeDispatch({ stat: 'loading' })
        setRetry(() => () => {
            if (runConfig?.retry) {
                run(runConfig?.retry(), runConfig)
            }
        })
        return promise
            .then((data) => {

                setData(data)
                return data
            })
            // catch会消化异常，如果不主动抛出，外面是接收不到异常的
            .catch((error) => {
                setError(error)
                if (config.throwOnError) {
                    return Promise.reject(error)
                }
                return error
            })
    }, [config.throwOnError, setData, setError, safeDispatch])

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        // retry 被调用时重新跑一边run，让state刷新
        retry,
        ...state
    }
}