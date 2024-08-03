import { useState } from 'react'
import './App.css'
import Weather from './components/Weather/Weather'
import Navbar from './components/Navbar/Navbar'
function App() {
  return (
    <>
    <Navbar/>
    <Weather/>
    </>
  )
}

export default App
