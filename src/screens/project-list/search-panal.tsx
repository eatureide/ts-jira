import { Input, Form, Select } from 'antd'
import { Project } from 'types/project'
import { UserSelect } from 'components/user-select'
import { User } from 'types/user'

interface SearchPanalProps {
    users: User[],
    param: Partial<Pick<Project, 'name' | 'personId'>>,
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
                <UserSelect
                    defaultOptionName={'负责人'}
                    value={param.personId}
                    onChange={(value: number | undefined) => setparam({
                        ...param,
                        personId: value
                    })}
                />
            </Form.Item>
        </Form>
    )
}