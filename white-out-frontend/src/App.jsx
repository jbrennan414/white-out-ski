import './App.css'
import Calendar from './Calendar.jsx'

import Header from './Header.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
