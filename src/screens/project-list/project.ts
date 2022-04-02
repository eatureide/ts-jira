import { useAsync } from 'utils/use-async'
import { Project } from './list'
import { useCallback, useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
import { useProjectSearchParams } from './util'
import { useAddConfig, useEditConfig } from 'utils/use-optimistic-options'

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }))
}

export const useProjectsQueryKey = () => {
    const [params] = useProjectSearchParams()
    return ['projectes', params]
}

export const useEditProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects/${params.id}`, {
                method: 'PATCH',
                data: params
            }),
        useEditConfig(queryKey)
    )
}

export const useAddProject = (queryKey: QueryKey) => {
    const client = useHttp()
    const queryClient = useQueryClient()
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: 'POST'
            }),
        useAddConfig(queryKey)
    )
}

export const useProject = (id?: number) => {
    const client = useHttp()
    return useQuery<Project>(
        ['project', { id }],
        () => client(`projects/${id}`),
        {
            enabled: Boolean(id)
        }
    )
}