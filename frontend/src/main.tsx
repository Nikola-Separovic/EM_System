import React from 'react';
import ReactDOM from 'react-dom/client';   
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext'; 
import App from './App.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <ThemeProvider>
         <Router>
           <App />
         </Router>
       </ThemeProvider>
     </React.StrictMode>
);
