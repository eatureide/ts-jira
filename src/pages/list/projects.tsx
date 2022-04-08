import { useEffect, useState } from 'react'
import { useDebounse, useSetUrlSearchParam } from 'utils/common'
import { Table, TableProps } from 'antd'
import { projectList } from 'apis/project'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

interface ProjectDataType {
    personId: number
    organization: string
    created: number
    ownerId: number
    name: string
    id: number
}


export const Projects = (props: TableProps<any>) => {

    const { paramsValue } = useSetUrlSearchParam(['name', 'personId'])
    const [projectData, setProjectData] = useState<ProjectDataType[]>([])
    const debounceValue = useDebounse(paramsValue)

    const handleList = async () => {
        const data = await projectList(paramsValue)
        setProjectData(data)
    }

    useEffect(() => {
        handleList()
    }, [debounceValue.name, debounceValue.personId])


    return (
        <Table
            rowKey={`id`}
            pagination={false}
            dataSource={projectData}
            columns={
                [
                    {
                        title: '名称',
                        sorter: (a, b) => a.name.localeCompare(b.name),
                        render: (_, project) => project.name
                    },
                    {
                        key: '部门',
                        title: '部门',
                        dataIndex: 'organization',
                        sorter: (a, b) => a.name.localeCompare(b.name)
                    },
                    {
                        title: '负责人',
                        render: (_, project) => project.name
                    },
                    {
                        title: '创建时间',
                        render: (_, project) => project.created ? dayjs(project.created).format('YYYY-MM-DD') : ''
                    }
                ]
            }
            {...props}
        />
    )
}