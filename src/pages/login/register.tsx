import { Form, Input, Button } from 'antd'
import { ErrorBox } from 'components/error-box'
import { useState } from 'react'
import { register } from 'apis/user'
import { useNavigate } from 'react-router-dom'
import { useUser } from 'models/user'

interface submitType {
    username: string
    password: string
    cpassword: string
}

export const Register = () => {

    const navigate = useNavigate()
    const useUserModal = useUser()
    const [error, setError] = useState<null | Error>(null)

    const handleSubmit = async ({ username, password, cpassword }: submitType) => {
        if (password !== cpassword) {
            setError({ name: '表单错误', message: '两次输入的密码必须相同' })
            return
        }
        try {
            const data = await register({ username, password })
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
            <Form.Item name={'cpassword'} rules={[{ required: true, message: '请确认密码' }]}>
                <Input placeholder="确认密码" type="password" id="cpassword" />
            </Form.Item>
            <Form.Item>
                <Button style={{ width: '100%' }} htmlType={`submit`}>注册</Button>
            </Form.Item>
        </Form>
    )
}