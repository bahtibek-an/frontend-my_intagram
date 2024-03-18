import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './components/AuthContext'; // Убедитесь, что этот импорт корректен
import { PostProvider } from './components/PostContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <PostProvider>
      <App />
      </PostProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
