import React from 'react'
import './Navbar.css'
import { BsGithub } from 'react-icons/bs'
import { BiX } from 'react-icons/bi'
function Navbar() {
  return (
    <div className="navbar_container">
        <h1 className="logo">S_arman</h1>
        <nav>
            <ul>
                <li>Weather App</li>
                <li>Wikipedia App</li>
                <li>Text_to_speech App</li>
                <li>Calculator App</li>
                <li>About me</li>
            </ul>
        </nav>
        <div className="fa_navbar">
            <BsGithub className='fa_social'/>
            <BiX className='fa_social'/>
        </div>
      
    </div>
  )
}

export default Navbar
