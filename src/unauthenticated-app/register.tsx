import { useAuth } from 'context/auth-context'
import { Form, Input, Button } from 'antd'
import { LongButton } from './index'

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
    const { register, user } = useAuth()

    const handleSubmit = async (values: { username: string, password: string }) => {
        try {
            await register(values)
        } catch (e: any) {
            onError(e)
        }
    }

    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'username'} rules={[{ required: true, message: '输入用户名' }]}>
                <Input placeholder="用户名" type="text" id="username" />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '输入密码' }]}>
                <Input placeholder="密码" type="password" id="password" />
            </Form.Item>
            <Form.Item>
                <LongButton htmlType={'submit'} type={'primary'}>登录</LongButton>
            </Form.Item>
        </Form>
    )
}

