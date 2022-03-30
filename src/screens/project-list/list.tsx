import { Table } from 'antd'
import { TableProps } from 'antd/es/table'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
// react-router和react-router-dom的关系类似于react和react-dom/react-native
import { User } from './search-panal'
import { UserSelect } from 'components/user-select'

export interface Project {
    key: string
    id: number
    name: string
    personId: number
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
                ]
            }
            {...props}
        />
    )
}