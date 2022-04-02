import { useAsync } from 'utils/use-async'
import { Project } from 'types/project'
import { useCallback, useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
import { useProjectSearchParams } from './util'
import { useAddConfig, useDeleteConfig, useEditConfig } from 'utils/use-optimistic-options'

export const useProjects = (param?: Partial<Project>) => {
    const client = useHttp()
    return useQuery<Project[]>(['projects', param], () => client('projects', { data: param }))
}

export const useProjectsQueryKey = () => {
    const [params] = useProjectSearchParams()
    return ['projects', params]
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
    return useMutation(
        (params: Partial<Project>) =>
            client(`projects`, {
                data: params,
                method: 'POST'
            }),
        useAddConfig(queryKey)
    )
}

export const useDeleteProject = (queryKey: QueryKey) => {
    const client = useHttp()
    return useMutation(
        ({ id }: { id: number }) =>
            client(`projects/${id}`, {
                method: 'DELETE'
            }),
        useDeleteConfig(queryKey)
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