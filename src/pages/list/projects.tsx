import { useEffect, useState } from 'react'
import { useDebounse, useSetUrlSearchParam } from 'utils/common'
import { Button, Dropdown, Menu, Modal, Table, TableProps } from 'antd'
import { projectList } from 'apis/project'
import { useProjectTable } from 'models/project-table'
import { Pin } from 'components/pin'
import { editProject, deleteProject } from 'apis/project'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

interface ProjectDataType {
    personId: number
    organization: string
    created: number
    ownerId: number
    name: string
    id: number
    pin?: boolean
}

const More = ({ project }: { project: ProjectDataType }) => {

    const { projectTable } = useProjectTable()
    const { setSearchParm } = useSetUrlSearchParam(['editId'])

    const handleDelete = () => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除吗？',
            onOk: async () => {
                await deleteProject(project)
                projectTable.handleList()
            }
        })
    }
    const handleEdit = async () => {
        setSearchParm({ editId: project.id + '', projectModal: 'true' })
    }
    const overlay = (
        <Menu>
            <Menu.Item key={'edit'}>
                <Button type={'link'} onClick={handleEdit}>编辑</Button>
            </Menu.Item>
            <Menu.Item key={'delete'}>
                <Button type={'link'} onClick={handleDelete}>删除</Button>
            </Menu.Item>
        </Menu>
    )
    return (
        <Dropdown overlay={overlay}>
            <Button type={'link'}>...</Button>
        </Dropdown>
    )
}

export const Projects = (props: TableProps<any>) => {

    const { setProjectTable } = useProjectTable()
    const { paramsValue } = useSetUrlSearchParam(['name', 'personId'])
    const [projectData, setProjectData] = useState<ProjectDataType[]>([])
    const debounceValue = useDebounse(paramsValue)
    const navigate = useNavigate()

    const handleList = async () => {
        const data = await projectList(paramsValue)
        setProjectData(data)
    }

    const handlePin = (id: number) => async (pin: boolean) => {
        const project = projectData.find((item) => item.id === id)
        if (!project) return
        project.pin = pin
        const res = await editProject(project)
        if (!res) return
        handleList()
    }

    useEffect(() => {
        handleList()
    }, [debounceValue.name, debounceValue.personId])

    useEffect(() => {
        setProjectTable({ handleList })
    }, [])

    return (
        <Table
            rowKey={`id`}
            pagination={false}
            dataSource={projectData}
            columns={
                [
                    {
                        render: (_, project) => <Pin checked={project.pin} onCheckChange={handlePin(project.id)} />
                    },
                    {
                        title: '名称',
                        sorter: (a, b) => a.name.localeCompare(b.name),
                        render: (_, project) => (
                            <Button
                                type={`link`}
                                onClick={() => {
                                    navigate(`/kanban?projectId=${project.id}`, { replace: true })
                                }}>
                                {project.name}
                            </Button>
                        )
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
                    },
                    {
                        render: (_, project) => <More project={project} />
                    }
                ]
            }
            {...props}
        />
    )
}