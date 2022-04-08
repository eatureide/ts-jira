import { Divider, Button, Card } from 'antd'
import { useState } from 'react'
import * as Styles from './styles'
import { Register } from './register'
import { Signin } from './signin'

export const LoginScreen = () => {

    const [isRegister, setRegister] = useState(false)
    
    return (
        <Styles.Contianer>
            <Styles.Logo />
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
        </Styles.Contianer>
    )
}