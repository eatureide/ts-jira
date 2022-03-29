import React, { ReactNode } from 'react'

type FallbackRedner = (props: { error: Error | null }) => React.ReactElement
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRedner }>, { error: Error | null }> {
    state = {
        error: null
    }

    // 当子组件抛出异常，这里会接收到并调用
    static getDerivedStateFromError(error: Error) {
        return {
            error
        }
    }

    render() {
        const { error } = this.state
        const { fallbackRender, children } = this.props
        if (error) {
            return fallbackRender({ error })
        }
        return children
    }
}