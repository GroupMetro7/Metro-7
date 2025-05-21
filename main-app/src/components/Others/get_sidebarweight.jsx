import { useEffect } from 'react'

export default function SideBarWeight() {
    useEffect(() => {
        const sidebar = document.querySelector('aside.sidebar');
        if (sidebar) {
          document.documentElement.style.setProperty(
            '--sidebar-w',
            sidebar.offsetWidth + 'px'
          );
        }
      }, []);
    }