import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { login } from 'apis/user'
import { ErrorBox } from 'components/error-box'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'models/user'

export const Signin = () => {
    const [error, setError] = useState<null | Error>(null)
    const useUserModal = useUser()
    const navigate = useNavigate()

    const handleSubmit = async ({ username, password }: { username: string, password: string }) => {

        try {
            const data = await login({ username, password })
            useUserModal.setUser(data.user)
            navigate('/list', { replace: true })
        } catch (error) {
            setError(error as Error)
        }
    }

    return (
        <Form onFinish={handleSubmit}>
            <ErrorBox error={error} />
            <Form.Item name={'username'} rules={[{ required: true, message: '输入用户名' }]}>
                <Input placeholder="用户名" type="text" id="username" />
            </Form.Item>
            <Form.Item name={'password'} rules={[{ required: true, message: '输入密码' }]}>
                <Input placeholder="密码" type="password" id="password" />
            </Form.Item>
            <Form.Item>
                <Button style={{ width: '100%' }} htmlType={`submit`}>登录</Button>
            </Form.Item>
        </Form>
    )
}