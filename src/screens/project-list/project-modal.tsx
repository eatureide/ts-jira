import { Drawer, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { projectListActions, selectProjectModalOpen } from './project-list.slice'


export const ProjectModal = () => {
    const dispatch = useDispatch()
    const projectModalOpen = useSelector(selectProjectModalOpen)
    return (
        <Drawer visible={projectModalOpen} onClose={() => dispatch(projectListActions.clouseProjectModal())}>
            <h1>project modal</h1>
            <Button onClick={() => dispatch(projectListActions.clouseProjectModal())}>关闭</Button>
        </Drawer>
    )
}