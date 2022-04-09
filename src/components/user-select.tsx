import { Select, SelectProps } from 'antd'
import { users } from 'apis/user'
import { useEffect, useState } from 'react'

export interface Member {
    personId: number | string;
    organization: string;
    created: number;
    ownerId: number;
    name: string;
    id: number;
    pin?: boolean
}

export interface UserSelectProps extends SelectProps {
    onChange?: (data: string) => void
    value?: string
}

export const UserSelect = ({ onChange, value = '', ...props }: UserSelectProps) => {

    const [data, setData] = useState<Member[]>([])

    useEffect(() => {
        handleUser()
    }, [])

    const handleUser = async () => {
        const response = await users()
        setData(response)
    }

    const handleOnChange = (value: string) => {
        onChange?.(value)
    }

    return (
        <Select
            style={{ width: '160px' }}
            value={data.length ? value : ''}
            onChange={handleOnChange}
            {...props}
        >
            <Select.Option value={''}>负责人</Select.Option>
            {
                data.map((menmber) => (
                    <Select.Option
                        value={menmber.id + ''}
                        key={menmber.id}>
                        {menmber.name}
                    </Select.Option>
                ))
            }
        </Select>
    )
}