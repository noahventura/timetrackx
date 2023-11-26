import React from 'react';
import logo from './images/logo.png'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about/About' // Your page component
import Login from './components/login/Login'; // Your page component
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
          </ul>
        </nav>
      </div>
      
      <img src={logo} alt="Timetrackx logo" />
    </div>
    
<Routes>
  <Route path='/about' element={<About name='About page'/>} />
  <Route path='/login' element={<Login name='Login Page' />} />
</Routes>
    </Router>

  );
}

export default  App;
