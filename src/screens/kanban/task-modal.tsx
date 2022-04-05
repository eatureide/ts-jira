import { useForm } from "antd/es/form/Form"
import { useTaskModal, useTasksQueryKey } from "./util"
import { useDeleteTask, useEditTask } from 'utils/task'
import { useEffect } from "react"
import { Modal, Form, Input, Button } from 'antd'
import { UserSelect } from "components/user-select"
import { TaskTypeSelect } from "components/task-type-select"

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

export const TaskModal = () => {
    const [form] = useForm()
    const { editingTaskId, editingTask, clouse } = useTaskModal()
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())
    const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey())

    const onCancel = () => {
        clouse()
        form.resetFields()
    }

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() })
        clouse()
    }

    const startDelete = () => {
        clouse()
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '确定删除吗？',
            onOk() {
                return deleteTask({ id: +editingTaskId })
            }
        })
    }

    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])

    return (
        <Modal forceRender={true} onCancel={onCancel} onOk={onOk} okText={'确认'} cancelText={'取消'} confirmLoading={editLoading} title={'编辑任务'} visible={!!editingTaskId}>
            <Form {...layout} initialValues={editingTask} form={form}>
                <Form.Item label={'任务名'} name={'name'} rules={[{ required: true, message: '请输入任务名' }]}>
                    <Input />
                </Form.Item>
                <Form.Item label={'经办人'} name={'processId'}>
                    <UserSelect defaultOptionName={'经办人'} />
                </Form.Item>
                <Form.Item label={'类型'} name={'typeId'}>
                    <TaskTypeSelect />
                </Form.Item>
                <div style={{ textAlign: 'right' }}>
                    <Button size={'small'} onClick={startDelete} style={{ fontSize: '14px' }}>删除</Button>
                </div>
            </Form>
        </Modal>
    )
}