import { useMemo } from 'react'
import { useUrlQueryParm } from 'utils/url'

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlQueryParm(['name', 'personId'])

    return [
        useMemo(() => (
            { ...param, personId: Number(param.personId) || undefined }
        ), [param]),
        setParam
    ] as const
}