import styled from '@emotion/styled'

export const Header = styled.div`
    box-shadow: 0 0 8px rgba(0,0,0,0.07);
    display: flex;
    align-items: center;
    position: relative;
    svg{
        height: 45%;
        margin-left: 2em;
    }
    div{
        font-size: 20px;
        margin-left: 2em;
        cursor: pointer;
    }
`

export const UserName = styled.div`
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right: 2em;
`

export const Container = styled.div`
    display: grid;
    grid-template-rows: 5rem 1fr;
    height: 100vh;
`

export const SearchPannel = styled.div`
    display:flex;
`

export const Main = styled.div`
    padding: 2em;
`