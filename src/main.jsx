import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';

ReactDOM.createRoot(document.getElementById('container')).render(
  <App />
);

(async () => {
  if ('serviceWorker' in navigator) {
    try {
      const thisFolder = location.pathname.replace(/\/index.html$/, '/');
      const registration = await navigator.serviceWorker.register(
          'service-worker.js', {scope: thisFolder});
      console.log('Service worker registration succeeded:', registration);
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  } else {
    console.error('Service workers are not supported.');
  }
})();
