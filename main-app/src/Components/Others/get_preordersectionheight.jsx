import { useEffect } from 'react'

export default function PreOrderSectionHeight() {
    useEffect(() => {
        const sectionpreorder = document.querySelector('section.pre-order');
        if (sectionpreorder) {
          document.documentElement.style.setProperty(
            '--preordersection-h',
            sectionpreorder.offsetHeight + 'px'
          );
        }
      }, []);
    }