import { useLocation } from "react-router"
import { useProject } from "screens/project-list/project"

export const useProjectIdInUrl = () => {
    const { pathname } = useLocation()
    const id = pathname.match(/projects\/(\d+)/)?.[1]
    return Number(id)
}

export const useProjectInInUrl = () => useProject(useProjectIdInUrl())

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTaskSearchParams = () => ({ projectId: useProjectIdInUrl() })

export const useTasksQueryKey = () => ['tasks', useTaskSearchParams()]