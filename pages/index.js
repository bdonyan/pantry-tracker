// pages/index.js
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Index() {
  const [user] = useAuthState(auth); // Get the current user
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push('/home'); // Redirect to home if logged in
    } else {
      router.push('/auth'); // Redirect to sign in if not logged in
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
    >
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        p={4}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Pantry Manager
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Efficiently manage your pantry, reduce waste, and never run out of essentials again.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGetStarted}>
          Get Started
        </Button>
      </Box>
      <Footer />
    </Box>
  );
}
