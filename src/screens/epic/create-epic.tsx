import { useEffect } from 'react'
import styled from '@emotion/styled'
import { Drawer, DrawerProps, Form, Spin, Input, Button } from "antd"
import { ErrorBox } from 'components/lib'
import { UserSelect } from 'components/user-select'
import { useAddEpic } from 'utils/epic'
import { useEpicQueryKey } from './util'
import { useProjectIdInUrl } from 'screens/kanban/util'

export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
    const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey())
    const [form] = Form.useForm()
    const projectId = useProjectIdInUrl()

    const onFinish = async (values: any) => {
        await addEpic({ ...values, projectId: projectId })
        props.onClose()
    }


    useEffect(() => {
        form.resetFields()
    }, [form, props.visible])

    return (
        <Drawer
            visible={props.visible}
            onClose={props.onClose}
            forceRender={true}
            destroyOnClose={true} width={'100%'}
        >
            <Container>
                <h1>创建任务组</h1>
                {isLoading && <Spin size={'large'} />}
                <ErrorBox error={error} />
                <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
                    <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入任务组名' }]}>
                        <Input placeholder={'请输入任务组名'} />
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button loading={isLoading} type={'primary'} htmlType={'submit'}>提交</Button>
                    </Form.Item>
                </Form>
            </Container>
        </Drawer>
    )
}

const Container = styled.div`
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
`

