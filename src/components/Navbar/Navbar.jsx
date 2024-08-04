import React from 'react'
import './Navbar.css'
import { BsGithub } from 'react-icons/bs'
import { BiLogoTwitter, BiX } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar_container">
        <h1 className="logo">S_arman</h1>
        <nav>
            <ul>
                <li onClick={()=>navigate('/weather')}>Weather App</li>
                <li onClick={()=>navigate('/wikipedia')}>Wikipedia App</li>
                <li onClick={()=>navigate('/text_to_speech')}>Text_to_speech App</li>
                <li onClick={()=>navigate('/calculator')}>Calculator App</li>
                <li>About me</li>
            </ul>
        </nav>
        <div className="fa_navbar">
            <BsGithub className='fa_social'/>
            <BiLogoTwitter className='fa_social'/>
        </div>
      
    </div>
  )
}

export default Navbar
