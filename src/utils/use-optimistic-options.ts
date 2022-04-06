import { Query, QueryKey, useQueryClient } from 'react-query'

export const useConfig = (queryKey: QueryKey, callBack: (target: any, old?: any[]) => any[]) => {
    const queryClient = useQueryClient()

    return {
        onSuccess: () => queryClient.invalidateQueries(queryKey),
        onError(error: any, newItem: any, context: any) {
            queryClient.setQueryData(queryKey, context.previousItems)
        },
        async onMutate(target: any) {
            const previousItems = queryClient.getQueryData(queryKey)
            queryClient.setQueryData(queryKey, (old?: any[]) => {
                return callBack(target, old)
            })
            return { previousItems }
        }

    }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old: any[] | undefined) =>
        old?.filter((item) =>
            item.id !== target.id) || [])

export const useEditConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old: any[] | undefined) =>
        old?.map((item) =>
            item.id === target.id ? { ...item, ...target } : item) || [])

export const useAddConfig = (queryKey: QueryKey) =>
    useConfig(queryKey, (target, old: any[] | undefined) =>
        old ? [...old, target] : [])

export const useReorderConfig = (queryKey: QueryKey) => useConfig(queryKey, (target, old: any[] | undefined) => old || [])