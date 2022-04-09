import { Rate, RateProps } from 'antd'

interface PinProps extends RateProps {
    checked: boolean
    onCheckChange?: (checked: boolean) => void
}

export const Pin = ({ checked, onCheckChange, ...resetProps }: PinProps) => {
    return (
        <Rate
            count={1}
            value={checked ? 1 : 0}
            onChange={(num) => onCheckChange?.(!!num)}
            {...resetProps}
        />
    )
}