import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calendar from './Calendar.jsx'

import Header from './Header.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Reservations from './Reservations.js'
import Day from './Day.jsx'
import { React } from 'react';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Calendar />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="day/:day" element={<Day />} /> 
          {/* <Route path="reservations" element={<Reservations />} />  */}
          {/* <Route path="*" element={<Calendar />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
