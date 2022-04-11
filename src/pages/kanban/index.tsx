import { PageContainer } from 'components/container'
import { kanbans } from 'apis/kanban'
import { useEffect } from 'react'
import { useSetUrlSearchParam } from 'utils/common'

export const Kanban = () => {

    const { paramsValue } = useSetUrlSearchParam(['projectId'])

    const handleKanbans = () => {
        
    }

    useEffect(() => {
        handleKanbans()
    }, [paramsValue.projectId])


    return (
        <PageContainer>
            <>
                kanban
            </>
        </PageContainer>
    )
}