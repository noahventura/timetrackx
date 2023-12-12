import React from 'react';
import logo from './images/logo.png'
import { Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about/About' // Your page component
import Login from './components/login/Login'; // Your page component
import Dashboard from './components/dashboard/Dashboard';
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

//MATERIAL STYLES
const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(4), // Adds space below the navbar
  },
  title: {
    flexGrow: 1, // Makes the title take up the full space to push navigation to the right
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    marginRight: theme.spacing(2),
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  activeLink: {
    textDecoration: 'underline',
  },
}));





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
