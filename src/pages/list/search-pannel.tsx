import * as Styles from './style'
import { UserSelect } from 'components/user-select'
import { Input, Form, Button } from 'antd'
import { useSetUrlSearchParam } from 'utils/common'
import { cleanObject } from 'utils/common'
import { useEffect } from 'react'

export const SearchPannel = () => {

    const { paramsValue: sarchParams, setSearchParm: setSearchParams } = useSetUrlSearchParam(['name', 'personId'])
    const { setSearchParm: setProjectModal } = useSetUrlSearchParam(['projectModal'])

    const [form] = Form.useForm()

    const handleOnChange = () => {
        const values = form.getFieldsValue()
        setSearchParams(cleanObject(values))
    }

    useEffect(() => {
        form.setFieldsValue(sarchParams)
    }, [])

    return (
        <Styles.SearchPannel>
            <Form form={form} layout={`inline`} onChange={handleOnChange}>
                <Form.Item name={'name'}>
                    <Input placeholder={`请输入经办人`} />
                </Form.Item>
                <Form.Item name={'personId'}>
                    <UserSelect onChange={handleOnChange} />
                </Form.Item>
            </Form>
            <Button onClick={() => setProjectModal({ projectModal: 'true' })}>创建项目</Button>
        </Styles.SearchPannel>
    )
}