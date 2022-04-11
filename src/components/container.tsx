import styled from '@emotion/styled'
import { PageHeader } from './header'

export const PageContainer = ({ children }: { children: JSX.Element }) => {
    return (
        <Container>
            <PageHeader />
            <Main>
                {children}
            </Main>
        </Container>
    )
}

export const Container = styled.div`
    display: grid;
    grid-template-rows: 5rem 1fr;
    height: 100vh;
`

export const Main = styled.div`
    padding: 2em;
`