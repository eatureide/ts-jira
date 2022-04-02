import { useMemo, useState } from 'react'
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom'
import { useProject } from 'screens/project-list/project'
import { cleanObject } from 'utils'


export const useUrlQueryParm = <K extends string>(keys: K[]) => {
    const [searchParams] = useSearchParams()
    const setSearchParms = useSetUrlSearchParam()
    const [setKeys] = useState(keys)
    return [
        useMemo(
            () => (
                keys.reduce((prev: {}, key: string) => {
                    return {
                        ...prev,
                        [key]: searchParams.get(key) || ''
                    }
                }, {}) as { [key in K]: string }
            ),
            [searchParams]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            // iterator
            return setSearchParms(params)
        }
    ] as const
}

export const useSetUrlSearchParam = () => {
    const [searchParams, setSearchParm] = useSearchParams()

    return (params: { [key in string]: unknown }) => {
        const o = cleanObject({
            ...Object.fromEntries(searchParams),
            ...params
        }) as URLSearchParamsInit
        return setSearchParm(o)
    }
}

export const useProjectModal = () => {
    const [{ projectCreate }, setProjectCreate] = useUrlQueryParm([
        'projectCreate'
    ])

    const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParm([
        'editingProjectId'
    ])

    const setUrlParams = useSetUrlSearchParam()
    const { data: editingProject, isLoading } = useProject(
        Number(editingProjectId)
    )

    const open = () => setProjectCreate({ projectCreate: true })
    const close = () => {
        setUrlParams({
            projectCreate: undefined,
            editingProjectId: undefined
        })
    }
    const startEdit = (id: number) => {
        setEditingProjectId({ editingProjectId: id })
    }

    return {
        projectModalOpen: projectCreate === 'true' || Boolean(editingProject),
        open,
        close,
        startEdit,
        editingProject,
        isLoading
    }
}