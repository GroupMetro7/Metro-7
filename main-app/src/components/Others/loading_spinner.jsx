import { useEffect, useState } from 'react';

export default function LoadingSpinner() {
    const [showSpinner, setShowSpinner] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let timer;
        if (loading) {
            timer = setTimeout(() => setShowSpinner(true), 3000);
        } else {
            setShowSpinner(false);
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [loading]);

    if (showSpinner) {
        return (
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

}
