import { Table } from 'antd'
import { User } from './search-panal'

interface Project {
    id: string
    name: string
    personId: string
    pin: boolean
    organization: string
}
interface ListProps {
    list: Project[]
    users: User[]
}

export const List = ({ list, users }: ListProps) => {

    return (
        <Table pagination={false} columns={[{
            title: '名称',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name)
        }, {
            title: '负责人',
            render(value, project) {
                return (
                    <>
                        {project.name}
                        {users.find((user) => user.id === project.personId)?.name || '未知'}
                    </>
                )
            }
        }]} dataSource={list} />
    )
}