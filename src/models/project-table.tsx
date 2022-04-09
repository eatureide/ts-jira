import { useState } from 'react'
import { createModel } from 'hox'

interface ProjectTableType {
    handleList: () => void
}

const initialState = {
    handleList: () => { }
}

export const useProjectTable = createModel(() => {
    const [projectTable, setProjectTable] = useState<ProjectTableType>(initialState)

    return {
        projectTable,
        setProjectTable
    }
})