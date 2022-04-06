import { Row, ScreenContainer } from "components/lib"
import { useProjectInInUrl, useTaskSearchParams } from 'screens/kanban/util'
import { useDeleteEpic, useEpics } from "utils/epic"
import { useEpicQueryKey, useEpicSearchParams } from "./util"
import { Button, List, Modal } from 'antd'
import dayjs from "dayjs"
import { useTasks } from "utils/task"
import { Link } from "react-router-dom"
import { CreateEpic } from "./create-epic"
import { useEffect, useState } from "react"
import { Epic } from "types/epic"

export const EpicScreen = () => {

    const { data: currentProject } = useProjectInInUrl()
    const { data: epics } = useEpics(useEpicSearchParams())
    const { data: tasks } = useTasks({ projectId: currentProject?.id })
    const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey())
    const [epicCraeteOpen, setEpicCraeteOpen] = useState(false)

    const confirmDeleteEpic = (epic: Epic) => {
        Modal.confirm({
            title: `确定删除项目组：${epic.name}`,
            content: "点击确定删除",
            okText: "确定",
            onOk() {
                deleteEpic({ id: epic.id });
            },
        });
    };


    return (
        <ScreenContainer>
            <Row between={true}>
                <h1>{currentProject?.name}任务组</h1>
                <Button onClick={() => setEpicCraeteOpen(true)} type={'link'}>创建任务组</Button>
            </Row>

            <List style={{ overflow: 'scroll', height: '70vh' }} dataSource={epics} itemLayout={'vertical'} renderItem={(epic) => {
                return (
                    <List.Item>
                        <List.Item.Meta title={<Row between={true}>
                            <span>{epic.name}</span>
                            <Button onClick={() => confirmDeleteEpic(epic)} type={"link"}>
                                删除
                            </Button>
                        </Row>}
                            description={
                                <div>
                                    <div>开始时间：{dayjs(epic.start).format('YYYY-MM-DD')}</div>
                                    <div>开始时间：{dayjs(epic.end).format('YYYY-MM-DD')}</div>
                                </div>
                            }
                        />
                        <div>
                            {
                                tasks?.filter((task) => task.epicId === epic.id).map((task) => {
                                    return <Link
                                        key={task.id}
                                        to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                                    >
                                        {task.name}
                                    </Link>
                                })
                            }
                        </div>
                    </List.Item>
                )
            }} />
            <CreateEpic visible={epicCraeteOpen} onClose={() => setEpicCraeteOpen(false)} />
        </ScreenContainer>
    )
}