import React from 'react';
import ReactDOM from 'react-dom/client'; // Notice we import from 'react-dom/client'
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root using createRoot

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
