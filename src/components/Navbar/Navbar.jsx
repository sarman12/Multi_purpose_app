import React from 'react';
import './Navbar.css';
import { BsGithub } from 'react-icons/bs';
import { BiLogoTwitter, BiX } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { LiaLinkedin } from 'react-icons/lia';

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar_container">
      <h1 className="logo" onClick={()=>navigate('/')}>S_arman</h1>
      <nav>
        <ul>
          <li onClick={() => navigate('/weather')}>Weather App</li>
          <li onClick={() => navigate('/wikipedia')}>Wikipedia App</li>
          <li onClick={() => navigate('/text-to-speech')}>Text-to-speech App</li>
          <li onClick={() => navigate('/calculator')}>Calculator App</li>
          {/* <li>About me</li> */}
        </ul>
      </nav>
      <div className="fa_navbar">
        <BsGithub className='fa_social' onClick={() => window.open('https://github.com/sarman12/')}  />
        <BiLogoTwitter className='fa_social' onClick={() => window.open('https://x.com/sahanee33743')} />
        <LiaLinkedin className='fa_social' onClick={() => window.open('https://www.linkedin.com/in/s-arman/')} />
      </div>
    </div>
  );
}

export default Navbar;
