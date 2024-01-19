import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';

ReactDOM.createRoot(document.getElementById('container')).render(
  <App />
);

(async () => {
  if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    try {
      const registration =
          await navigator.serviceWorker.register('service-worker.js');
      console.log('Service worker registration succeeded:', registration);
    } catch (error) {
      console.error(`Service worker registration failed: ${error}`);
    }
  } else {
    console.error('Service workers are not supported.');
  }
})();
