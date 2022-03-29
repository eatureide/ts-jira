import React, { ReactNode } from 'react'

type FallbackRedner = (props: { error: Error | null }) => React.ReactElement
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRedner }>, { error: Error | null }> {
    state = {
        error: null
    }

    // 当子组件抛出异常，这里会接收到并调用，这里会将state的error设为返回的error
    static getDerivedStateFromError(error: Error) {
        return {
            error
        }
    }

    render() {
        const { error } = this.state
        const { fallbackRender, children } = this.props
        if (error) {
            // 将捕获到的error传入组件
            return fallbackRender({ error })
        }
        return children
    }
}