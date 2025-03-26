import { useEffect } from 'react'

export default function Body_addclass( classname ) {
    useEffect(() => {
        document.body.classList.add( classname );
        return () => {
            document.body.classList.remove( classname );
        };
    }, [ classname ]);
}