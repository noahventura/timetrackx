import React from 'react';
import logo from './images/logo.png'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './components/about/About' // Your page component
import Login from './components/login/Login'; // Your page component
import Dashboard from './components/dashboard/Dashboard';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

//MATERIAL STYLING
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  marginRight: theme.spacing(2),
  '&:hover': {
    textDecoration: 'underline',
  },
  ...(active && {
    textDecoration: 'underline',
  }),
}));





function App() {
  const location = useLocation(); // Gets the current route location

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Timetrackx
          </Typography>
          <StyledButton component={RouterLink} to="/" active={location.pathname === '/'}>
            Home
          </StyledButton>
          <StyledButton component={RouterLink} to="/about" active={location.pathname === '/about'}>
            About Us
          </StyledButton>
          <StyledButton component={RouterLink} to="/login" active={location.pathname === '/login'}>
            Login
          </StyledButton>
          <StyledButton component={RouterLink} to="/dashboard" active={location.pathname === '/dashboard'}>
            Dashboard
          </StyledButton>
        </Toolbar>
      </StyledAppBar>

      <Routes>
        <Route path='/about' element={<About name='About page'/>} />
        <Route path='/login' element={<Login name='Login Page' />} />
        <Route path='/dashboard' element={<Dashboard name='Dashboard' />} />
      </Routes>
    </>
  );
}

export default App;
