import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Weather from './components/Weather/Weather';
import Wikipedia from './components/Wikipedia/Wikipedia';
import Calculator from './components/Calculator/Calculator';
import Text_to_speech from './components/Text_to_speech/Text_to_speech';
import Home from './components/Home/Home';
import './App.css';

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  return (
    <BrowserRouter>
      {isNavbarVisible && <Navbar />}
      <Routes>
        <Route path="/" element={<Home toggleNavbar={toggleNavbar} />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/wikipedia" element={<Wikipedia />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/text-to-speech" element={<Text_to_speech />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
