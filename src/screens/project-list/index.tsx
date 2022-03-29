import { useEffect, useState } from 'react'
import { SearchPanal } from './search-panal'
import { List } from './list'
import { cleanObject, useMount, useDebounse } from 'utils'
import { useHttp } from 'utils/http'
import styled from '@emotion/styled'


// 使用js的同学，大部分的错都是在runtime时发现的
// 我们希望在静态代码中，就能找到其中的一些错误->强类型

export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])

    const [param, setparam] = useState({
        name: '',
        personId: ''
    })
    const debounceparam = useDebounse(param, 200)
    const [list, setList] = useState([])
    const client = useHttp()

    useEffect(() => {
        client('projects', { data: cleanObject(debounceparam) }).then(setList)
    }, [debounceparam])

    useMount(() => {
        client('users').then(setUsers)
    })
 
    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanal users={users} param={param} setparam={setparam} />
            <List users={users} list={list} />
        </Container>
    )
}

const Container = styled.div`
    padding:3.2rem;
`