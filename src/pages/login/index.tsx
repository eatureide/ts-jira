import { Divider, Button, Card } from 'antd'
import { useState } from 'react'
import { Register } from './register'
import { Signin } from './signin'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'

const LoginScreen = () => {

    const [isRegister, setRegister] = useState(false)

    return (
        <Contianer>
            <Logo />
            <Card style={{ width: '30em' }}>
                {isRegister ? <Register /> : <Signin />}
                <Divider />
                <Button
                    type={'link'}
                    onClick={() => setRegister(!isRegister)}
                >
                    切换到{isRegister ? '已经有账户了？直接登录' : '没有账号？注册新账号'}
                </Button>
            </Card>
        </Contianer>
    )
}

export const Logo = styled.div`
    background: url(${logo}) center no-repeat;
    padding: 5rem;
    background-size: 8rem;
    width: 100%;
`

export const Contianer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    .ant-card{
        padding: 5em;
    }
`

export default LoginScreen