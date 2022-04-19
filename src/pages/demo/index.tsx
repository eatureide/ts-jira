import './styles.css'
import { useEffect, useState } from 'react'

const mp4 = 'http://vjs.zencdn.net/v/oceans.mp4'

export default function App() {

    const [visible, setVisible] = useState(false)

    const handleMouseEnter = () => {
        setVisible(true)
    }

    const handleMouseOut = () => {
        setVisible(false)
    }

    return (
        <div>
            <div className={`box`} id="box" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseOut}>
                <div className={visible ? 'showBox' : 'hideBox'}>
                    <video src={visible ? mp4 : ''} muted autoPlay />
                </div>
                在线下单
            </div>
        </div>
    )
}