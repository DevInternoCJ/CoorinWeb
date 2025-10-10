import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './index.css'
import './App.css'
import LoginPage from '../src/hu/login/LoginPage';
import CoorinDashboard from "./hu/dashboard/CoorinDashboard";
import PrortectedRoute from './utils/ProtectedRoute';
import { Toaster} from 'sonner';

function App() {

  return (
    <>
      <div className="container-fluid min-h-screen">
        <Toaster/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrortectedRoute canActivate={true} redirectTo='/' />}>
            <Route path="/dashboardPage" element={<CoorinDashboard />} />
          </Route>
          {/* <Route element={<PrortectedRoute canActivate={false} redirectTo='/login'/>}/> */}
        </Routes>
      </div>
    </>
  );
}

export default App
