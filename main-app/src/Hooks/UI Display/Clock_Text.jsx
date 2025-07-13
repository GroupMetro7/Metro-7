import { useState, useEffect } from 'react'

export default function useClockText() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const [time, setTime] = useState(``)    
    const date = `${days[new Date().getDay()]}, ${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`;

    useEffect(() => {
        const updateClock = () => {
            setTime(new Date().toLocaleTimeString())
        }
        updateClock()
        const interval = setInterval(updateClock, 1)
    }, [])

    return {time, date}
}