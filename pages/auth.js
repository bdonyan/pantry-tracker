import { useState } from 'react';
import { Box, Button, TextField, Typography, Tabs, Tab, Alert, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already in use. Please use a different email.');
      } else {
        setError('Error signing up. Please try again.');
      }
      console.error('Error signing up:', error);
    }
  };

  const handleSignIn = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/home');
    } catch (error) {
      setError('Error signing in. Please check your credentials.');
      console.error('Error signing in:', error);
    }
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    setError(''); // Clear error message when tab changes
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          p: 4
        }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sign in to manage your pantry, reduce waste, and never run out of essentials.
        </Typography>
        <Tabs value={activeTab} onChange={handleChange} sx={{ mb: 2 }}>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        {error && <Alert severity="error">{error}</Alert>}
        {activeTab === 0 && (
          <Box width="100%" maxWidth="400px" mt={3}>
            <Typography variant="h5" gutterBottom>
              Sign In
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSignIn}>
              Sign In
            </Button>
          </Box>
        )}
        {activeTab === 1 && (
          <Box width="100%" maxWidth="400px" mt={3}>
            <Typography variant="h5" gutterBottom>
              Sign Up
            </Typography>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
              Sign Up
            </Button>
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default AuthPage;
