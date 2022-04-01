import { Drawer, Button } from 'antd'
import { useProjectModal } from 'utils/url'


export const ProjectModal = () => {
    const { projectModalOpen, clouse } = useProjectModal()
    return (
        <Drawer visible={projectModalOpen} onClose={clouse} width={'100%'}>
            <h1>project modal</h1>
            <Button onClick={clouse}>关闭</Button>
        </Drawer>
    )
}