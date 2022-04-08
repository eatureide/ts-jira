import * as Styles from './style'
import { UserSelect } from 'components/user-select'
import { Input, Form } from 'antd'
import { useSetUrlSearchParam } from 'utils/common'
import { cleanObject } from 'utils/common'
import { useEffect } from 'react'

export const SearchPannel = () => {

    const { paramsValue, setSearchParm } = useSetUrlSearchParam(['name', 'personId'])
    const [form] = Form.useForm()

    const handleOnChange = () => {
        const values = form.getFieldsValue()
        setSearchParm(cleanObject(values))
    }

    useEffect(() => {
        form.setFieldsValue(paramsValue)
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
        </Styles.SearchPannel>
    )
}