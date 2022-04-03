import { useMemo } from "react"
import { useLocation } from "react-router"
import { useProject } from "screens/project-list/project"
import { useUrlQueryParm } from "utils/url"

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => {
    const [parm, setParam] = useUrlQueryParm([
        'name',
        'typeId',
        'processId',
        'tagId'
    ])
    const projectId = useProjectIdInUrl()
    return useMemo(() => ({
        projectId,
        typeId: Number(parm.typeId) || undefined,
        processId: Number(parm.processId) || undefined,
        tagId: Number(parm.tagId) || undefined,
        name: parm.name
    }), [projectId, parm])
}

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]