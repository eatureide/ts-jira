import { Table, Rate, Dropdown, Menu, Modal } from 'antd'
import { TableProps } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
// react-router和react-router-dom的关系类似于react和react-dom/react-native
import { User } from 'types/user'
import { UserSelect } from 'components/user-select'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject, useProjectsQueryKey } from './project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal } from 'utils/url'
import { Project } from 'types/project'


interface ListProps extends TableProps<Project> {
    users: User[]
}

export const List = ({ users, ...props }: ListProps) => {

    const { mutate } = useEditProject(useProjectsQueryKey())
    const { startEdit } = useProjectModal()
    const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })
    const editProject = (id: number) => () => startEdit(id)


    return (
        <Table
            rowKey={'id'}
            pagination={false}
            columns={
                [
                    {
                        title: <Pin checked={true} disabled={true} />,
                        render(value, project) {
                            return (
                                <Pin
                                    checked={project.pin}
                                    onCheckChange={pinProject(project.id)}
                                />
                            )
                        }
                    },
                    {
                        title: '名称',
                        sorter: (a, b) => a.name.localeCompare(b.name),
                        render(value, project) {
                            return <Link to={`${project.id}`}>{project.name}</Link>
                        }
                    },
                    {
                        key: '部门',
                        title: '部门',
                        dataIndex: 'organization',
                        sorter: (a, b) => a.name.localeCompare(b.name)
                    },
                    {
                        title: '负责人',
                        render(value, project) {
                            return (
                                <>
                                    {project.name}
                                    {users.find((user) => user.id === project.personId)?.name || '未知'}
                                </>
                            )
                        }
                    },
                    {
                        title: '创建时间',
                        render(value, project) {
                            return (
                                <span>
                                    {
                                        project.created ? dayjs(project.created).format('YYYY-MM-DD') : ''
                                    }
                                </span>
                            )
                        }
                    },
                    {
                        render(value, project) {
                            return <More project={project} />
                        },
                    }
                ]
            }
            {...props}
        />
    )
}

const More = ({ project }: { project: Project }) => {

    const { startEdit } = useProjectModal()
    const editProject = (id: number) => () => startEdit(id)
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
    const confirmDeleteProject = (id: number) => {
        Modal.confirm({
            title: '确定删除？',
            content: '点击确定删除',
            okText: '确定',
            onOk() {
                deleteProject({ id })
            }
        })
    }

    return (
        <Dropdown overlay={
            <Menu>
                <Menu.Item key={'edit'} onClick={editProject(project.id)}>编辑</Menu.Item>
                <Menu.Item key={'delete'} onClick={() => confirmDeleteProject(project.id)}>删除</Menu.Item>
            </Menu>
        }>
            <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
        </Dropdown>
    )
}