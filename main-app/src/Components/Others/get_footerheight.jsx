import { useEffect } from 'react'

export default function FooterHeight() {
    useEffect(() => {
        const footer = document.querySelector('footer');
        if (footer) {
          document.documentElement.style.setProperty(
            '--footer-h',
            footer.offsetHeight + 'px'
          );
        }
      }, []);
    }