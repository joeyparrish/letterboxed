import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { backgroundColor } from './context'

ReactDOM.createRoot(document.getElementById('container') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const root = document.querySelector(':root');
root.style.setProperty('--background-color', backgroundColor)