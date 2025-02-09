import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';





  
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if email and password are provided
        if (!email || !password) {
          setError('Please fill in both fields');
          return;
        }
    
        try {
          const response = await fetch('https://your-backend-url.com/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await response.json();
    
          if (response.ok) {
            // Store token and navigate to dashboard
            localStorage.setItem('token', data.token);
            navigate('/dashboard');
          } else {
            setError(data.error || 'Login failed. Please try again.');
          }
        } catch (error) {
          setError('Something went wrong. Please try again.');
        }
      };
    


  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      padding: 2,
    }}
  >
    <Typography variant="h4" gutterBottom>
      Login
    </Typography>
    
    {/* Display error if any */}
    {error && <Typography color="error">{error}</Typography>}

    <form onSubmit={handleSubmit}>
      {/* Email TextField */}
      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />

      {/* Password TextField */}
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />

      {/* Login Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: 2 }}
      >
        Login
      </Button>
    </form>
  </Box>
  )
}

export default Login