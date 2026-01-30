import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Componente para redirigir a home
const RedirectToHome = () => <Navigate to="/" replace />;
import "./index.css";
import "./App.css";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useUserStore } from "./contextGlobal/userStore";
import { Toaster } from "sonner";
import LoaderSuspense from "./components/loading/LoaderSuspense";
import CoorinBlack from "./assets/CoorinBlack.svg";

const LoginPage = lazy(() => import("../src/hu/login/LoginPage"));
const CoorinDashboard = lazy(() => import("./hu/dashboard/CoorinDashboard"));

const Loader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="relative">
      <LoaderSuspense size="lg" color=" border-jerarquia3" />
      <img
        src={CoorinBlack}
        alt="logo-loader"
        className="h-18 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  </div>
);

function App() {
  return (
    <>
      <div className="container-fluid min-h-screen">
        <Toaster position="top-right" richColors />
        <Routes>
          {/* Suspense para LoginPage */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <LoginPage />
              </Suspense>
            }
          />
          {/* Suspense para dashboardPage*/}
          <Route
            element={
              <ProtectedRoute
                canActivate={
                  // Permitir acceso solo si existe token y usuario autenticado (store o localStorage)
                  (() => {
                    try {
                      // Usar sessionStorage: persiste en recargas pero se borra al cerrar la pestaña
                      const token =
                        sessionStorage.getItem("token") ||
                        localStorage.getItem("token");
                      const isAuthenticated =
                        useUserStore.getState()?.isAuthenticated;
                      const storedUser = JSON.parse(
                        sessionStorage.getItem("userData") ||
                          localStorage.getItem("userData") ||
                          "null",
                      );
                      return !!token && (isAuthenticated || !!storedUser);
                    } catch (e) {
                      return false;
                    }
                  })()
                }
                redirectTo="/"
              />
            }
          >
            <Route
              path="/dashboardPage/*"
              element={
                <Suspense fallback={<Loader />}>
                  <CoorinDashboard />
                </Suspense>
              }
            />
            {/* Ruta para SideBar con modal abierto */}
            <Route
              path="/SideBar/*"
              element={
                <Suspense fallback={<Loader />}>
                  <CoorinDashboard />
                </Suspense>
              }
            />
          </Route>
          {/* Ruta catch-all: redirige cualquier URL desconocida a / */}
          <Route path="*" element={<RedirectToHome />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
