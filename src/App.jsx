import './App.css'
import Weather from './components/Weather/Weather'
import Wikipedia from './components/Wikipedia/Wikipedia'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/weather" element={<Weather/>}/>
      <Route path="/wikipedia" element={<Wikipedia/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
