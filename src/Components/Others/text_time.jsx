import { useState, useEffect } from 'react'

export default function TimeText() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateClock = () => {
            setTime(new Date().toLocaleTimeString());
        };
        setInterval(updateClock, 1);
    }, []);

    return time
}