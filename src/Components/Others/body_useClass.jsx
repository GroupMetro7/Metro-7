import { useEffect } from 'react'

export default function Body_useClass( classname ) {
    useEffect(() => {
        document.body.classList.add( classname );
        return () => {
            document.body.classList.remove( classname );
        };
    }, [ classname ]);
}