import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Home from "./Home";
import UtownSlots from "./GymSlots/UtownSlots";
import UscSlots from "./GymSlots/UscSlots";
import KrmpshSlots from "./GymSlots/KrmpshSlots";
import OutreachSlots from "./GymSlots/OutreachSlots";
import UpcomingBooking from "./UpcomingBooking"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
  <div className="app">
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path ="/home" element={<Home />} />
      <Route path ="/utownSlots" element={<UtownSlots />} />
      <Route path ="/uscSlots" element={<UscSlots />} />
      <Route path ="/krmpshSlots" element={<KrmpshSlots />} />
      <Route path ="/outreachSlots" element={<OutreachSlots />} />
      <Route path ="/upcomingBooking" element={<UpcomingBooking />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;