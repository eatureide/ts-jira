import { useState } from 'react'
import { createModel } from 'hox'
import { User } from 'utils/user'

const initialState = {
    id: 0,
    name: '',
    email: '',
    title: '',
    organization: '',
    token: ''
}

export const useUser = createModel(() => {
    const [user, setUser] = useState<User>(initialState)
    const cleanUser = () => { setUser(initialState) }
    
    return {
        user,
        setUser,
        cleanUser
    }
})