import { useState } from 'react'

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

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defualtConfig) => {

    const config = { ...defualtConfig, ...initialConfig }
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    const [retry, setRetry] = useState(() => () => { })

    const setData = (data: D) => {
        setState({
            data,
            stat: 'success',
            error: null
        })
    }

    const setError = (error: Error) => {
        setState({
            error,
            stat: 'error',
            data: null
        })
    }

    // 用来触发异步请求
    const run = (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
        if (!promise || !promise.then) {
            throw new Error('请传入promise类型数据')
        }
        setState({ ...state, stat: 'loading' })
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
    }

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