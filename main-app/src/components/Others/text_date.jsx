import React from 'react'

export default function DateText() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const date = `${days[new Date().getDay()]}, ${months[new Date().getMonth()]} ${new Date().getDate()}, ${new Date().getFullYear()}`;

    return date 
}
