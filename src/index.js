import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import './index.css';
import Home from './components/Home'
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
    < Dashboard /> 
    </BrowserRouter>
  // </React.StrictMode>
);

