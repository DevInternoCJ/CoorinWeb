import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import './index.css'
import './App.css'
import LoginPage  from '../src/hu/login/LoginPage';

function App() {

  return (
    <>
      <div className="container min-h-screen">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboardPage" element={""}/>
        </Routes>
      </div>
    </>
  );
}

export default App
