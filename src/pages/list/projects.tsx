import { useSetUrlSearchParam } from 'utils/common'

export const ProjectList = () => {

    const { paramsValue } = useSetUrlSearchParam(['name', 'personId'])
    
    return (
        <div>List</div>
    )
}