import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './index.css'
import './App.css'
import LoginPage  from '../src/hu/login/LoginPage';
import CoorinDashboard from "./hu/dashboard/CoorinDashboard";
function App() {

  return (
    <>
      <div className="container-fluid min-h-screen">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboardPage" element={<CoorinDashboard/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App
