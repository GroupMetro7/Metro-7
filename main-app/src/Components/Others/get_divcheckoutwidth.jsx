import { useEffect } from 'react'

export default function CheckoutWidth() {
    useEffect(() => {
        const div = document.querySelector('div.checkout');
        if (div) {
            document.documentElement.style.setProperty(
                '--checkout-w',
                div.offsetWidth + 'px'
            );
        }
    }, []);
}