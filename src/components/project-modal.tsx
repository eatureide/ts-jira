import { Button, Drawer, Form, Input, Typography } from 'antd'
import { useSetUrlSearchParam } from 'utils/common'
import styled from '@emotion/styled'
import { addProject, editProject, projectList } from 'apis/project'
import { UserSelect } from './user-select'
import { useProjectTable } from 'models/project-table'
import { useEffect } from 'react'

export const ProjectModal = () => {

    const { projectTable } = useProjectTable()
    const [form] = Form.useForm()
    const { paramsValue: projectModal, setSearchParm: setProjectModal } = useSetUrlSearchParam(['projectModal', 'editId'])

    const handleClose = () => {
        form.resetFields()
        setProjectModal({})
    }

    const onFinish = async ({ name, organization, personId }: { [key: string]: string }) => {
        const value = { name, personId: Number(personId), organization }
        const res = projectModal.editId ? await editProject({ ...value, id: Number(projectModal.editId) }) : await addProject(value)
        if (!res) return
        handleClose()
        projectTable.handleList()
    }

    const handleDetail = async () => {
        const res = await projectList({ id: Number(projectModal.editId) })
        if (!res) return
        const data = res[0]
        form.setFieldsValue({ ...data, personId: data.personId + '' })
    }

    useEffect(() => {
        if (!projectModal.editId) return
        handleDetail()
    }, [projectModal.editId])

    return (
        <Drawer forceRender width={'100%'} visible={Boolean(projectModal.projectModal)} onClose={handleClose}>
            <Container >

                {
                    projectModal.editId ?
                        <Typography.Title level={2}>编辑项目</Typography.Title> :
                        <Typography.Title level={2}>创建项目</Typography.Title>
                }

                <Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
                    <Form.Item label={'名称'} name={'name'} rules={[{ required: true, message: '请输入项目名' }]}>
                        <Input placeholder={'请输入项目名称'} />
                    </Form.Item>
                    <Form.Item label={'部门'} name={'organization'} rules={[{ required: true, message: '请输入部门名' }]}>
                        <Input placeholder={'请输入部门名称'} />
                    </Form.Item>
                    <Form.Item label={'负责人'} name={'personId'}>
                        <UserSelect style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'right' }}>
                        <Button type={'primary'} htmlType={'submit'}>提交</Button>
                    </Form.Item>
                </Form>
            </Container>
        </Drawer>
    )
}

const Container = styled.div`
    margin-top: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`