import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/auth');
  };

  return (
    <Box>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#f5f5f5"
        textAlign="center"
        padding={4}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Pantry Manager
        </Typography>
        <Typography variant="h5" gutterBottom>
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
