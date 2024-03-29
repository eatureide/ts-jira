import { useState } from 'react'
import { SearchPanal } from './search-panal'
import { List } from './list'
import { useDebounse, useDcoumentTitle } from 'utils'
import { useUrlQueryParm } from 'utils/url'
import styled from '@emotion/styled'
import { Typography, Button } from 'antd'
import { useProjects } from './project'
import { useUsers } from './user'
import { useProjectSearchParams } from './util'
import { Row, ButtonNoPadding, ErrorBox } from 'components/lib'
import { useProjectModal } from 'utils/url'

// 使用js的同学，大部分的错都是在runtime时发现的
// 我们希望在静态代码中，就能找到其中的一些错误->强类型


// 基本类型，可以放到依赖里，组件状态可以放到以来里，非组件状态的对象，绝不可以放到依赖里
// codesandBox.io/s/keen-wave-tlz9s?file=/src/App.js

export const ProjectListScreen = () => {
    useDcoumentTitle('项目列表', false)

    const [param, setParam] = useProjectSearchParams()
    const { isLoading, error, data: list } = useProjects(useDebounse(param, 200))
    const { data: users } = useUsers()
    const { open } = useProjectModal()

    return (
        <Container>
            <Row between={true}>
                <h1>项目列表</h1>
                <ButtonNoPadding
                    onClick={open}
                    type={'link'}
                >
                    创建项目
                </ButtonNoPadding>
            </Row>

            <SearchPanal users={users || []} param={param} setparam={setParam} />
            <ErrorBox error={error} />
            <List
                users={users || []}
                dataSource={list || []}
                loading={isLoading}
            />
        </Container>
    )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
    padding:3.2rem;
`
