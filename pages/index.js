import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { Box, Button, Typography, Container } from '@mui/material';
import { auth } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Index() {
  const [user] = useAuthState(auth); // Get the current user
  const router = useRouter();

  const handleGetStarted = () => {
    if (user) {
      router.push('/pantry'); // Redirect to home if logged in
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
      <Container
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
          p: 4,
        }}
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
      </Container>
      <Footer />
    </Box>
  );
}
