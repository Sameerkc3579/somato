import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// IMPORTANT: Replace the string below with your REAL Google Client ID 
// from the Google Cloud Console (APIs & Services > Credentials).
const GOOGLE_CLIENT_ID = "1063946541816-gto9oino3k42vai7ditbv0kabb8v84j4.apps.googleusercontent.com"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* The GoogleOAuthProvider wraps the entire app, allowing the 
        useGoogleLogin hook in Navbar.jsx to function correctly. 
      */}
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);