import { Drawer, Button, Spin, Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import { useProjectModal } from 'utils/url'
import { useAddProject, useEditProject } from './project'
// import { useForm } from 'antd/es/form/form'
import { useEffect } from 'react'
import { ErrorBox } from 'components/lib'
import styled from '@emotion/styled'


export const ProjectModal = () => {
    const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()

    const useMutateProject = editingProject ? useEditProject : useAddProject
    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()

    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields()
            close()
        })
    }
    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])

    const title = editingProject ? '编辑项目' : '创建项目'

    return (
        <Drawer forceRender visible={projectModalOpen} onClose={close} width={'100%'}>
            <Container>
                <h1>{title}</h1>
                {isLoading && <Spin size={'large'} />}
                <ErrorBox error={error} />
                <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
                    <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入项目名' }]}>
                        <Input placeholder={'请输入项目名称'} />
                    </Form.Item>
                    <Form.Item label={'部门'} name={'organization'} rules={[{ required: true, message: '请输入部门名' }]}>
                        <Input placeholder={'请输入部门名称'} />
                    </Form.Item>
                    <Form.Item label={'负责人'} name={'personId'}>
                        <UserSelect defaultOptionName={'负责人'} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>提交</Button>
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