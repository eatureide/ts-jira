import styled from '@emotion/styled'
import logo from 'assets/logo.svg'

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