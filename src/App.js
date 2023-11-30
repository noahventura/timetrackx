import React from 'react';
import logo from './images/logo.png'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about/About' // Your page component
import Login from './components/login/Login'; // Your page component
import Dashboard from './components/dashboard/Dashboard';
function App() {
  return (
    <Router>
    <div>
      <div id='navBar'>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to='/about'>About Us</Link>
            </li>
            <li>
              <Link to='/login'>login</Link>
            </li>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
      

    </div>
    
<Routes>
  <Route path='/about' element={<About name='About page'/>} />
  <Route path='/login' element={<Login name='Login Page' />} />
  <Route path='/dashboard' element={<Dashboard name='Dashboard' />} />
</Routes>
    </Router>

  );
}

export default  App;
