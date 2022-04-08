import { Typography } from 'antd'


export const ErrorBox = ({ error }: { error: Error | null }) => {
    if (error?.message) {
        return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
    }
    return null
}