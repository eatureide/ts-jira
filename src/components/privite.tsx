import { useUser } from 'models/user'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from 'utils/user'
import { me } from 'apis/user'

export const Privite = ({ children }: { children: JSX.Element }) => {

    const useUserModel = useUser()
    const navigate = useNavigate()
    const token = getToken()

    const boostrapUser = async () => {
        if (!token) return
        const data = await me({ token })
        useUserModel.setUser(data.user)
    }

    useEffect(() => {
        if (useUserModel.user.token) {
            return
        }
        if (!token) {
            navigate('/login', { replace: true })
        }
    }, [useUserModel.user])

    useEffect(() => {
        boostrapUser()
    }, [])

    return children
}