import React from 'react'
import { Link } from 'react-router-dom'
import '../Static/css/Components/HEADER.css'
import M7LOGO from '../Static/assets/img/TEXT LOGO.png'

function Header() {
    return(
        <>
        <div class="header">
                <div class="titleside">
                    <img src={M7LOGO} />
                </div>
                <nav>
                    <Link to='/'>HOME</Link>
                    <Link to='/location'>LOCATION</Link>
                    <a href=''>MENU</a>
                    <Link to='/login'>LOGIN</Link>
                </nav>
        </div>
        </>
    )
}

export default Header;