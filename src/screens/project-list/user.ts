import { useAsync } from 'utils/use-async'
import { useEffect } from 'react'
import { cleanObject } from 'utils'
import { useHttp } from 'utils/http'
import { User } from 'types/user'
import { useQuery } from 'react-query'

// export const useUsers = (param?: Partial<User>) => {
//     const client = useHttp()
//     const { run, ...result } = useAsync<User[]>()

//     useEffect(() => {
//         run(client('users', { data: cleanObject(param || {}) }))
//     }, [param])

//     return result
// }

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    return useQuery<User[]>(['users', param], () =>
        client(`users`, { data: param })
    )
}