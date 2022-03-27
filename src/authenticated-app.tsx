import { Button } from 'antd'
import { ProjectListScreen } from 'screens/project-list'
import { useAuth } from 'context/auth-context'

export const AuthticatedApp = () => {
    const { logout } = useAuth()
    return (
        <div>
            <Button onClick={logout}>登出</Button>
            <ProjectListScreen />
        </div>
    )
}