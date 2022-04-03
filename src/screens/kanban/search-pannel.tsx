import { Input, Button } from "antd"
import { Row } from "components/lib"
import { TaskTypeSelect } from "components/task-type-select"
import { UserSelect } from "components/user-select"
import { useSetUrlSearchParam } from "utils/url"
import { useTaskSearchParams } from "./util"

export const SearchPannel = () => {
    const searchParams = useTaskSearchParams()
    const setSearchParams = useSetUrlSearchParam()
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processId: undefined,
            tagId: undefined,
            name: undefined
        })
    }
    return (
        <Row marginBottom={4} gap={true}>
            <Input
                style={{ width: '20rem' }}
                placeholder={'任务名'}
                value={searchParams.name}
                onChange={(evt) => setSearchParams({ name: evt.target.value })} />
            <UserSelect
                defaultOptionName={'经办人'}
                value={searchParams.processId}
                onChange={(value) => setSearchParams({ processId: value })}
            />
            <TaskTypeSelect defaultOptionName={'类型'} value={searchParams.typeId} onChange={(value) => setSearchParams({ typeId: value })} />
            <Button onClick={reset}>清除筛选器</Button>
        </Row>
    )
}