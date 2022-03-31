import { Drawer, Button } from 'antd'


export const ProjectModal = (props: { projectModalOpen: boolean, onClouse: () => void }) => {
    return (
        <Drawer visible={props.projectModalOpen} onClose={props.onClouse} width={'100%'}>
            <h1>project modal</h1>
            <Button onClick={props.onClouse}>关闭</Button>
        </Drawer>
    )
}