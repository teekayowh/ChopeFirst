import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
  <div className="app">
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;