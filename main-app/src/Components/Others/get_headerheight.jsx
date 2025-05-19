import { useEffect } from 'react'

export default function HeaderHeight() {
    useEffect(() => {
        const header = document.querySelector('header');
        if (header) {
          document.documentElement.style.setProperty(
            '--header-h',
            header.offsetHeight + 'px'
          );
        }
      }, []);
    }