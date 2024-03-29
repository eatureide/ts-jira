import { useState } from 'react'
import { RegisterScreen } from 'unauthenticated-app/register'
import { LoginScreen } from 'unauthenticated-app/login'
import { Card, Button, Divider, Typography } from 'antd'
import styled from '@emotion/styled'
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { useDcoumentTitle } from 'utils'
import { ErrorBox } from 'components/lib'

export const UnauthenticatedApp = () => {
    const [isRegister, setRegister] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    useDcoumentTitle('请登录注册以继续')

    return (
        <Contianer>
            <Header />
            <Backgrpund />
            <ShadowCard>
                <Title>{isRegister ? '请注册' : '请登录'}</Title>
                <ErrorBox error={error} />
                {isRegister ? <RegisterScreen onError={setError} /> : <LoginScreen onError={setError} />}
                <Divider />
                <Button type={'link'} onClick={() => setRegister(!isRegister)}>切换到{isRegister ? '已经有账户了？直接登录' : '没有账号？注册新账号'}</Button>
            </ShadowCard>

        </Contianer>
    )
}

export const LongButton = styled(Button)`
    width: 100%;
`

const Title = styled.h2`
    margin-bottom: 2.4rem;
    color:rgb(94,108,132);
`

const Backgrpund = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment:fixed;
    background-position:left bottom,right bottom;
    background-size:calc(((100vw - 40rem)/2) - 3.2rem),calc(((100vw - 40rem)/2) - 3.2rem),cover;
    background-image:url(${left}),url(${right});
`

const Header = styled.header`
    background: url(${logo}) center no-repeat;
    padding:5rem;
    background-size: 8rem;
    width: 100%;
`

const ShadowCard = styled(Card)`
    width: 40rem;
    min-height: 56rem;
    padding:3.2rem 4rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    box-sizing: rgba(0,0,0,0.1) 0 0 10px;
`

const Contianer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
`