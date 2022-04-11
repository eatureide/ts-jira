import { PageContainer, Main } from 'components/container'
import { kanbans, allTasks } from 'apis/kanban'
import { useEffect, useState } from 'react'
import { useSetUrlSearchParam } from 'utils/common'

interface kanbanState {
    id: number
    name: string
    ownerId: number
    projectId: number
}

export const Kanban = () => {

    const { paramsValue: { projectId } } = useSetUrlSearchParam(['projectId'])
    const [kanbanData, setKanbanData] = useState<kanbanState[]>([])

    const handleKanbans = async () => {
        const data = await kanbans({ projectId })
        await allTasks()
    }

    useEffect(() => {
        handleKanbans()
    }, [projectId])


    return (
        <PageContainer>
            <Main>
                kanban
            </Main>
        </PageContainer>
    )
}