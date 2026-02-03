import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import "preline";

// Sincronización de sesión entre pestañas:
// Al iniciar sesión en una pestaña emitimos una señal breve en localStorage
// con la clave `coorin-session-sync`. Otras pestañas escuchan ese evento
// y copian el `token` y `userData` a su `sessionStorage` para poder usar
// la sesión inmediatamente sin persistirla en localStorage.
window.addEventListener("storage", (e) => {
  try {
    if (!e.key) return;
    if (e.key !== "coorin-session-sync") return;
    const payload = JSON.parse(e.newValue || "null");
    if (payload && payload.token) {
      sessionStorage.setItem("token", payload.token);
    }
    if (payload && payload.userData) {
      sessionStorage.setItem("userData", JSON.stringify(payload.userData));
    }
  } catch (err) {
    // silencioso
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
