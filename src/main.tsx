import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ActivitiesProvider } from './context/ActivitiesContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ActivitiesProvider>
      <App />
    </ActivitiesProvider>
  </React.StrictMode>
);
