import { Input, Form, Select } from 'antd'

export interface User {
    id: string
    name: string
    email: string
    title: string
    organization: string
    token: string
}
interface SearchPanalProps {
    users: User[],
    param: {
        name: string
        personId: string
    },
    setparam: (param: SearchPanalProps['param']) => void
}

export const SearchPanal = ({ users, param, setparam }: SearchPanalProps) => {

    return (
        <Form layout={'inline'} style={{ marginBottom: '2rem' }}>
            <Form.Item>
                <Input type="text" placeholder={'项目名'} value={param.name} onChange={evt => setparam({
                    ...param,
                    name: evt.target.value
                })} />
            </Form.Item>
            <Form.Item>
                <Select value={param.personId}
                    onChange={(value) => setparam({
                        ...param,
                        personId: value
                    })}>
                    <Select.Option  value={''}>负责人</Select.Option>
                    {
                        users.map((user, index) => (
                            <Select.Option key={index} value={user.id}>{user.name}</Select.Option>
                        ))
                    }
                </Select>
            </Form.Item>
        </Form>
    )
}