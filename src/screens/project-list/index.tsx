import { useState } from 'react'
import { SearchPanal } from './search-panal'
import { List } from './list'
import { useDebounse } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from './project'
import { useUsers } from './user'


// 使用js的同学，大部分的错都是在runtime时发现的
// 我们希望在静态代码中，就能找到其中的一些错误->强类型

export const ProjectListScreen = () => {

    const [param, setparam] = useState({
        name: '',
        personId: ''
    })
    const debounceparam = useDebounse(param, 200)
    const { isLoading, error, data: list } = useProjects(debounceparam)
    const { data: users } = useUsers()

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanal users={users || []} param={param} setparam={setparam} />
            {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
            <List users={users || []} dataSource={list || []} loading={isLoading} />
        </Container>
    )
}

const Container = styled.div`
    padding:3.2rem;
`
