import { Table } from 'antd'
import { TableProps } from 'antd/es/table'
import dayjs from 'dayjs'
import { User } from './search-panal'

export interface Project {
    key: string
    id: string
    name: string
    personId: string
    pin: boolean
    organization: string
    created: number
}
interface ListProps extends TableProps<Project> {
    users: User[]
}

export const List = ({ users, ...props }: ListProps) => {

    return (
        <Table
            rowKey={'id'}
            pagination={false}
            columns={
                [
                    {
                        title: '名称',
                        dataIndex: 'name',
                        sorter: (a, b) => a.name.localeCompare(b.name)
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
                ]
            }
            {...props}
        />
    )
}