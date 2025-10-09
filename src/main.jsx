import React from 'react'
import ReactDOM from 'react-dom/client' 
import { BrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import 'preline';
import { HSStaticMethods } from 'preline';

HSStaticMethods.autoInit();
// Opcional: Observar cambios en el DOM para componentes dinámicos
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    HSStaticMethods.autoInit();
  }
});

observer.observe(document.body, {
  attributes: true,
  subtree: true,
  childList: true,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
